import { AnimatePresence } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import { memo } from 'react'

const Routing = () => (
  <AnimatePresence>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </AnimatePresence>
)

export default memo(Routing)
