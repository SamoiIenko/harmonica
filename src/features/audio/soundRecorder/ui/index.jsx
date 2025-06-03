import { memo } from 'react'

const _SoundRecorder = () => {
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
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
          const audioURL = URL.createObjectURL(audioBlob)
          const listItem = document.createElement('li')
          const audioLink = document.createElement('a')
          audioLink.href = audioURL
          audioLink.download = 'audio.wav'
          audioLink.textContent = 'Download Audio'
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

      <audio id="audioPlayer" controls></audio>
    </div>
  )
}

export const SoundRecorder = memo(_SoundRecorder)
