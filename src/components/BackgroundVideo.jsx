import React from 'react' // Подключите CSS для стилизации
import BuddyGreene from '../assets/BuddyGreene.mp4'
import harmonicaLogo from '../assets/Harmonica.png'
import './styles.scss'

const BackgroundVideo = () => {
  return (
    <div className="video-container">
      <div className="header">
        <img src={harmonicaLogo} alt="Harmonica Logo" />
      </div>
      <video autoPlay loop muted>
        <source src={BuddyGreene} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Контент, который будет поверх видео */}
      <div className="content-overlay">
        <h1>Your Content Here</h1>
      </div>
    </div>
  )
}

export default BackgroundVideo
