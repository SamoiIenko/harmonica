import { memo, useRef, useState } from 'react'

const _SoundRecorder = () => {
  const audioContextRef = useRef(null)
  const destinationRef = useRef(null)
  const mediaRecorderRef = useRef(null)

  const [chunks, setChunks] = useState([])
  const [audioURL, setAudioURL] = useState(null)

  const playAndRecord = async () => {
    if (!audioContextRef.current) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)()
      const destination = audioContext.createMediaStreamDestination()

      const mediaRecorder = new MediaRecorder(destination.stream)
      mediaRecorderRef.current = mediaRecorder
      audioContextRef.current = audioContext
      destinationRef.current = destination

      const recordedChunks = []
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          return recordedChunks.push(e.data)
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: 'audio/webm' })
          const url = URL.createObjectURL(blob)
          setAudioURL(url)
        }
      }
    }

    const ctx = audioContextRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(destinationRef.current)
    gain.connect(ctx.destination)

    osc.frequency.value = 440
    osc.start()
    osc.stop(ctx.currentTime + 0.5)

    mediaRecorderRef.current.start()
    setTimeout(() => {
      mediaRecorderRef.current.stop()
    }, 500)
  }

  return (
    <div>
      <button onClick={playAndRecord}>Click for sound and record</button>
      {audioURL && <audio controls src={audioURL}></audio>}
    </div>
  )
}

export const SoundRecorder = memo(_SoundRecorder)
