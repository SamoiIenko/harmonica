import { SoundRecorder } from '@features/audio'
import { memo } from 'react'

const _CreatePageWidget = () => (
  <div>
    <SoundRecorder />
  </div>
)

export const CreatePageWidget = memo(_CreatePageWidget)
