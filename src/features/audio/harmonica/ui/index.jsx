import { memo, useCallback, useEffect, useRef, useState } from 'react'

import { HARMONICA_NOTES } from '@entities/note'
import { NOTE_DURATION, playTone } from '@shared/lib/audio'

import styles from './styles.module.scss'

// The layout never changes, so the two rows are split once at module level
// rather than on every render.
const BLOW_NOTES = HARMONICA_NOTES.filter((note) => note.direction === 'blow')
const DRAW_NOTES = HARMONICA_NOTES.filter((note) => note.direction === 'draw')

const _Harmonica = () => {
  const [activeNoteId, setActiveNoteId] = useState(null)
  const highlightTimerRef = useRef(null)

  // Drop a pending highlight reset if the component unmounts mid-note.
  useEffect(() => () => clearTimeout(highlightTimerRef.current), [])

  const playNote = useCallback((note) => {
    playTone(note.frequency)
    setActiveNoteId(note.id)

    // Restart the timer on every press so hammering two buttons cannot leave
    // an earlier one lit.
    clearTimeout(highlightTimerRef.current)
    highlightTimerRef.current = setTimeout(
      () => setActiveNoteId(null),
      NOTE_DURATION * 1000
    )
  }, [])

  const renderNote = (note) => {
    const className = [
      styles['note-button'],
      styles[`note-button--${note.direction}`],
      activeNoteId === note.id && styles['note-button--active'],
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        key={note.id}
        type="button"
        className={className}
        onClick={() => playNote(note)}
        aria-label={`Hole ${note.hole} ${note.direction}, note ${note.name}`}
      >
        {note.name}
      </button>
    )
  }

  return (
    <div className={styles['harmonica-block']}>
      <h2 className={styles['harmonica-title']}>Harmonica in C</h2>

      <div className={styles['harmonica-grid']}>
        <span className={styles['row-label']}>Blow</span>
        {BLOW_NOTES.map(renderNote)}

        <span className={styles['row-label']}>Hole</span>
        {BLOW_NOTES.map((note) => (
          <span key={note.hole} className={styles['hole-number']}>
            {note.hole}
          </span>
        ))}

        <span className={styles['row-label']}>Draw</span>
        {DRAW_NOTES.map(renderNote)}
      </div>
    </div>
  )
}

export const Harmonica = memo(_Harmonica)
