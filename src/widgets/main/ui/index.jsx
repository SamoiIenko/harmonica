import { memo } from 'react'
import { Col, Row } from 'react-bootstrap'

import harmonicaLogo from '@assets/Harmonica_gr.png'
import harmonicaLayerTool from '@assets/harmonica_tool_layers.png'

import { Sidebar } from '@features/sidebar'

import styles from './styles.module.scss'

const _MainPageWidget = () => (
  <div>
    <div className={styles['header']}>
      <img src={harmonicaLogo} alt="Harmonica Logo" />
    </div>
    <Row>
      <Col md={3} className="mt-5">
        <Sidebar />
      </Col>
      <Col md={9} className="mt-5">
        <img src={harmonicaLayerTool} alt="Harmonica Tool" />
      </Col>
    </Row>
  </div>
)
export const MainPageWidget = memo(_MainPageWidget)
