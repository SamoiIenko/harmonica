// The note layout of a standard 10-hole diatonic harmonica in the key of C -
// Richter tuning, which is what every beginner instrument ships with.

const A4_FREQUENCY = 440
const A4_MIDI_NUMBER = 69
const SEMITONES_PER_OCTAVE = 12

// Equal temperament: each semitone step multiplies the frequency by the twelfth
// root of two. Deriving the pitch instead of hardcoding decimals keeps every
// note exactly in tune with the others.
const midiToFrequency = (midiNumber) =>
  A4_FREQUENCY * Math.pow(2, (midiNumber - A4_MIDI_NUMBER) / SEMITONES_PER_OCTAVE)

//
// --- Richter layout -----------------------------------------------------------
//

// Written as MIDI numbers rather than frequencies because those are the values
// you can check against any harmonica chart at a glance (middle C = 60).
//
// Hole 7 looks wrong and is not: its draw note (B5) sits BELOW its blow note
// (C6). Holes 1-6 draw higher than they blow, holes 7-10 draw lower. That
// reversal is real Richter tuning, so do not "fix" it.
const RICHTER_C_LAYOUT = [
  { hole: 1, blow: { name: 'C4', midi: 60 }, draw: { name: 'D4', midi: 62 } },
  { hole: 2, blow: { name: 'E4', midi: 64 }, draw: { name: 'G4', midi: 67 } },
  { hole: 3, blow: { name: 'G4', midi: 67 }, draw: { name: 'B4', midi: 71 } },
  { hole: 4, blow: { name: 'C5', midi: 72 }, draw: { name: 'D5', midi: 74 } },
  { hole: 5, blow: { name: 'E5', midi: 76 }, draw: { name: 'F5', midi: 77 } },
  { hole: 6, blow: { name: 'G5', midi: 79 }, draw: { name: 'A5', midi: 81 } },
  { hole: 7, blow: { name: 'C6', midi: 84 }, draw: { name: 'B5', midi: 83 } },
  { hole: 8, blow: { name: 'E6', midi: 88 }, draw: { name: 'D6', midi: 86 } },
  { hole: 9, blow: { name: 'G6', midi: 91 }, draw: { name: 'F6', midi: 89 } },
  { hole: 10, blow: { name: 'C7', midi: 96 }, draw: { name: 'A6', midi: 93 } },
]

//
// --- Playable notes -----------------------------------------------------------
//

// Flattened into one list of playable notes, two per hole. `id` is stable and
// serves as both the React key and the "which button is currently lit" marker.
export const HARMONICA_NOTES = RICHTER_C_LAYOUT.flatMap(
  ({ hole, blow, draw }) => [
    {
      id: `hole-${hole}-blow`,
      hole,
      direction: 'blow',
      name: blow.name,
      frequency: midiToFrequency(blow.midi),
    },
    {
      id: `hole-${hole}-draw`,
      hole,
      direction: 'draw',
      name: draw.name,
      frequency: midiToFrequency(draw.midi),
    },
  ]
)
