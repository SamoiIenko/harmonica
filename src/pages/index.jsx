import { AnimatePresence } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import { memo } from 'react'
//
import { PreviewPage } from './preview'
import { HomePage } from './home'

const Routing = () => (
  <AnimatePresence>
    <Routes>
      <Route path="/" element={<PreviewPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </AnimatePresence>
)

export default memo(Routing)
