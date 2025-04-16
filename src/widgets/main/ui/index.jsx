import { memo } from 'react'
import harmonicaLogo from '@assets/Harmonica_gr.png'
import harmonicaLayerTool from '@assets/harmonica_tool_layers.png'
import { Sidebar } from '@features/sidebar'

import styles from './styles.module.scss'

const _MainPageWidget = () => (
  <div>
    <div className={styles['header']}>
      <img src={harmonicaLogo} alt="Harmonica Logo" />
    </div>
    <Sidebar />
    <img src={harmonicaLayerTool} alt="Harmonica Tool" />
  </div>
)
export const MainPageWidget = memo(_MainPageWidget)
