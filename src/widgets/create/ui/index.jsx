import { Harmonica, SoundRecorder } from '@features/audio'
import { memo } from 'react'

const _CreatePageWidget = () => (
  <div>
    <Harmonica />
    <SoundRecorder />
  </div>
)

export const CreatePageWidget = memo(_CreatePageWidget)
