import { memo, useEffect, useRef, useState } from 'react'

import law from '@assets/law.mp3'

const _SoundRecorder = () => {
  const [activeNote, setActiveNote] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioListRef = useRef(null)
  const audioPlayerRef = useRef(null)
  const audioLaw = useRef(new Audio(law))

  useEffect(() => {
    if (activeNote) {
      const timer = setTimeout(() => setActiveNote(null), 1000)
      return () => clearTimeout(timer)
    }
  }, [activeNote])

  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      console.error("Browser doesn't support audio recording.")
      return
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream)

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) audioChunksRef.current.push(event.data)
        }

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
          const audioURL = URL.createObjectURL(audioBlob)
          const listItem = document.createElement('li')
          const audioLink = document.createElement('a')

          audioLink.href = audioURL
          audioLink.download = 'audio.webm'
          audioLink.textContent = 'Download Audio'

          listItem.appendChild(audioLink)
          audioListRef.current.appendChild(listItem)
          audioPlayerRef.current.src = audioURL

          audioChunksRef.current = []
        }

        mediaRecorderRef.current = recorder
      })
      .catch((error) => console.error('Error accessing the microphone: ' + error))
  }, [])

  const noteHandler = (notePosition) => setActiveNote(notePosition)

  const startRecordingButton = () => {
    audioChunksRef.current = []
    mediaRecorderRef.current.start()
  }

  const stopRecordingBuutton = () => {
    mediaRecorderRef.current.stop()
  }

  return (
    <div>
      <h1>Recorder</h1>
      <button onClick={startRecordingButton}>Start recording</button>
      <button onClick={stopRecordingBuutton}>Stop recording</button>
      <ul ref={audioListRef}></ul>
      <div>
        <button
          style={{
            backgroundColor: activeNote ? '#ffe26e' : 'green',
          }}
          onClick={(e) => noteHandler('one')}
        >
          1
        </button>
        <button
          style={{
            backgroundColor: activeNote ? '#ffe26e' : 'green',
          }}
          onClick={() => audioLaw.current.play()}
        >
          2
        </button>
        <button onClick={(e) => noteHandler(activeNote, e.target)}>3</button>
        <button onClick={(e) => noteHandler('four', e.target)}>4</button>
        <button onClick={(e) => noteHandler('five', e.target)}>5</button>
        <button onClick={(e) => noteHandler('six', e.target)}>6</button>
        <button onClick={(e) => noteHandler('seven', e.target)}>7</button>
        <button onClick={(e) => noteHandler('eight', e.target)}>8</button>
        <button onClick={(e) => noteHandler('nine', e.target)}>9</button>
        <button onClick={(e) => noteHandler('ten', e.target)}>10</button>
      </div>

      <audio ref={audioPlayerRef} controls></audio>
    </div>
  )
}

export const SoundRecorder = memo(_SoundRecorder)
