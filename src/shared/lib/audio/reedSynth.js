// Reed tone generator built on the native Web Audio API.
//
// Notes are synthesised rather than sampled: the repo only holds 4 recordings
// and the instrument needs 20, so generating them keeps every hole exactly in
// tune and consistent in timbre. If a full set of recordings is added later,
// this module is the only place that has to change.

const DEFAULT_DURATION = 0.9
const ATTACK_TIME = 0.015
const SETTLE_TIME = 0.2
const PEAK_GAIN = 0.16
const SUSTAIN_RATIO = 0.55
const SILENCE = 0.0001

// A single harmonica hole holds two reeds that are never in perfect tune, and
// that slight mismatch is what gives the instrument its shimmer. Detuning a
// pair of oscillators by a few cents reproduces the same beating.
const DETUNE_CENTS = 7

// How far above the fundamental the lowpass opens. Tracking the cutoff to the
// pitch keeps the low holes warm without leaving the high holes muffled.
const BRIGHTNESS = 7
const MAX_CUTOFF = 14000

let audioContext = null

// Browsers refuse to start an AudioContext outside a user gesture, so it is
// created on the first played note rather than at import time, then reused.
const getAudioContext = () => {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    audioContext = new AudioContextClass()
  }

  // A context can be suspended again after the tab loses focus.
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }

  return audioContext
}

// How long a single note sounds, exported so the UI can match its highlight to
// the audio instead of keeping a second copy of the number.
export const NOTE_DURATION = DEFAULT_DURATION

export const playTone = (frequency, duration = DEFAULT_DURATION) => {
  const context = getAudioContext()
  const startAt = context.currentTime
  const stopAt = startAt + duration

  //
  // --- Signal chain: two detuned reeds -> lowpass -> envelope -> speakers ---
  //

  const envelope = context.createGain()
  const filter = context.createBiquadFilter()

  filter.type = 'lowpass'
  filter.frequency.value = Math.min(frequency * BRIGHTNESS, MAX_CUTOFF)
  filter.Q.value = 0.7

  filter.connect(envelope)
  envelope.connect(context.destination)

  const reeds = [-DETUNE_CENTS, DETUNE_CENTS].map((detune) => {
    const oscillator = context.createOscillator()

    // Sawtooth carries the strong upper harmonics that make a reed buzz; the
    // lowpass above then tames them back into something playable.
    oscillator.type = 'sawtooth'
    oscillator.frequency.value = frequency
    oscillator.detune.value = detune
    oscillator.connect(filter)

    return oscillator
  })

  //
  // --- Envelope: a reed speaks almost instantly, settles, then fades ---
  //

  envelope.gain.setValueAtTime(0, startAt)
  envelope.gain.linearRampToValueAtTime(PEAK_GAIN, startAt + ATTACK_TIME)
  envelope.gain.exponentialRampToValueAtTime(
    PEAK_GAIN * SUSTAIN_RATIO,
    startAt + SETTLE_TIME
  )
  envelope.gain.exponentialRampToValueAtTime(SILENCE, stopAt)

  reeds.forEach((oscillator) => {
    oscillator.start(startAt)
    // Stopping just after the envelope reaches silence avoids a click.
    oscillator.stop(stopAt + 0.02)
  })
}
