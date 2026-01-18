import { memo, useEffect, useState } from 'react'

const _SoundRecorder = () => {
  const [activeNote, setActiveNote] = useState(null)

  useEffect(() => {
    if (activeNote) {
      const timer = setTimeout(() => setActiveNote(null), 1000)
      return () => clearTimeout(timer)
    }
  }, [activeNote])

  const noteHandler = (notePosition) => setActiveNote(notePosition)

  const audioList = document.getElementById('audioList')
  const audioPlayer = document.getElementById('audioPlayer')
  let mediaRecorder
  let audioChunks = []

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        mediaRecorder = new MediaRecorder(stream)

        mediaRecorder.ondataavailable = function (event) {
          if (event.data.size > 0) {
            audioChunks.push(event.data)
          }
        }

        mediaRecorder.onstop = function () {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
          const audioURL = URL.createObjectURL(audioBlob)
          const listItem = document.createElement('li')
          const audioLink = document.createElement('a')
          audioLink.href = audioURL
          audioLink.download = 'audio.webm'
          audioLink.textContent = 'Download Audio'

          console.log(audioLink)
          listItem.appendChild(audioLink)
          audioList.appendChild(listItem)
          audioPlayer.src = audioURL
          audioChunks = []
        }
      })
      .catch(function (error) {
        console.error('Error accessing the microphone: ' + error)
      })
  } else {
    console.error("Browser doesn't support audio recording.")
  }

  const startRecordingButton = () => {
    audioChunks = []
    mediaRecorder.start()
    startRecordingButton.disabled = true
    stopRecordingBuutton.disabled = false
  }

  const stopRecordingBuutton = () => {
    mediaRecorder.stop()
    startRecordingButton.disabled = false
    stopRecordingBuutton.disabled = true
  }

  return (
    <div>
      <h1>Recorder</h1>
      <button onClick={startRecordingButton}>Start recording</button>
      <button onClick={stopRecordingBuutton}>Stop recording</button>
      <ul id="audioList"></ul>
      <div>
        <button
          style={{
            backgroundColor: activeNote ? '#ffe26e' : 'green',
          }}
          onClick={(e) => noteHandler('one')}
        >
          1
        </button>
        <button onClick={(e) => noteHandler(activeNote, e.target)}>2</button>
        <button onClick={(e) => noteHandler(activeNote, e.target)}>3</button>
        <button onClick={(e) => noteHandler('four', e.target)}>4</button>
        <button onClick={(e) => noteHandler('five', e.target)}>5</button>
        <button onClick={(e) => noteHandler('six', e.target)}>6</button>
        <button onClick={(e) => noteHandler('seven', e.target)}>7</button>
        <button onClick={(e) => noteHandler('eight', e.target)}>8</button>
        <button onClick={(e) => noteHandler('nine', e.target)}>9</button>
        <button onClick={(e) => noteHandler('ten', e.target)}>10</button>
      </div>

      <audio id="audioPlayer" controls></audio>
    </div>
  )
}

export const SoundRecorder = memo(_SoundRecorder)
