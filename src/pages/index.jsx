import { AnimatePresence } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import StartPage from '../components/Home'
import Homepage from 'components/Homepage'
import { memo } from 'react'

const Routing = () => (
  <AnimatePresence>
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/home" element={<Homepage />} />
    </Routes>
  </AnimatePresence>
)

export default memo(Routing)
