import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import styles from './index.css'

const rootElement = document.getElementById('root')

const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
