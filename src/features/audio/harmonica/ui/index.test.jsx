import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Harmonica } from './index'

// jsdom has no Web Audio API, so the synth is given a stub that records the
// pitch of every oscillator that actually starts. That is what lets the test
// assert a button produces the right note rather than merely that it was clicked.
const startedFrequencies = []

class AudioContextStub {
  constructor() {
    this.currentTime = 0
    this.state = 'running'
    this.destination = {}
  }

  createGain() {
    return {
      gain: {
        setValueAtTime: jest.fn(),
        linearRampToValueAtTime: jest.fn(),
        exponentialRampToValueAtTime: jest.fn(),
      },
      connect: jest.fn(),
    }
  }

  createBiquadFilter() {
    return {
      type: '',
      frequency: { value: 0 },
      Q: { value: 0 },
      connect: jest.fn(),
    }
  }

  createOscillator() {
    const oscillator = {
      type: '',
      frequency: { value: 0 },
      detune: { value: 0 },
      connect: jest.fn(),
      stop: jest.fn(),
    }

    oscillator.start = jest.fn(() =>
      startedFrequencies.push(oscillator.frequency.value)
    )

    return oscillator
  }

  resume() {}
}

beforeAll(() => {
  window.AudioContext = AudioContextStub
})

beforeEach(() => {
  startedFrequencies.length = 0
})

test('renders a blow and a draw button for all ten holes', () => {
  render(<Harmonica />)

  expect(screen.getAllByRole('button')).toHaveLength(20)
  expect(
    screen.getByRole('button', { name: 'Hole 1 blow, note C4' })
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: 'Hole 10 draw, note A6' })
  ).toBeInTheDocument()
})

test('plays the pitch of the hole that was clicked', async () => {
  render(<Harmonica />)

  await userEvent.click(
    screen.getByRole('button', { name: 'Hole 4 blow, note C5' })
  )

  // Two reeds per note, both at the fundamental - the detune is applied
  // separately, in cents.
  expect(startedFrequencies).toHaveLength(2)
  startedFrequencies.forEach((frequency) =>
    expect(frequency).toBeCloseTo(523.25, 1)
  )
})

test('hole 7 draws lower than it blows, as real Richter tuning does', async () => {
  render(<Harmonica />)

  await userEvent.click(
    screen.getByRole('button', { name: 'Hole 7 blow, note C6' })
  )
  const [blowFrequency] = startedFrequencies

  startedFrequencies.length = 0
  await userEvent.click(
    screen.getByRole('button', { name: 'Hole 7 draw, note B5' })
  )
  const [drawFrequency] = startedFrequencies

  expect(drawFrequency).toBeLessThan(blowFrequency)
})
