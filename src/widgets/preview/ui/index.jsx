import { memo } from 'react'
import BuddyGreene from '@assets/BuddyGreene.mp4'
import harmonicaLogo from '@assets/Harmonica.png'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'

const _PreviewPageWidget = () => {
  const navigate = useNavigate()

  const openHomePage = () => {
    navigate('/home')
  }

  return (
    <div className={styles['video-container']} onClick={openHomePage}>
      <div className={styles['header']}>
        <img src={harmonicaLogo} alt="Harmonica Logo" />
      </div>
      <video autoPlay loop muted>
        <source src={BuddyGreene} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Контент, который будет поверх видео */}
      <div className={styles['content-overlay']}>
        <h1>Your Content Here</h1>
      </div>
    </div>
  )
}

export const PreviewPageWidget = memo(_PreviewPageWidget)
