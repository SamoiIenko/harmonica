import { memo, useEffect, useRef } from 'react'

const _SoundRecorder = () => {
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioListRef = useRef(null)
  const audioPlayerRef = useRef(null)

  useEffect(() => {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      console.error("Browser doesn't support audio recording.")
      return
    }

    navigator.mediaDevices
      .getDisplayMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream)

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) audioChunksRef.current.push(event.data)
        }

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: 'audio/webm',
          })
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
      .catch((error) =>
        console.error('Error accessing the microphone: ' + error)
      )
  }, [])

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
      <audio ref={audioPlayerRef} controls></audio>
    </div>
  )
}

export const SoundRecorder = memo(_SoundRecorder)
