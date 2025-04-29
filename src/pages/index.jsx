import { AnimatePresence } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import { memo } from 'react'
//
import { PreviewPage } from './preview'
import { HomePage } from './home'
import { CreatePage } from './create'

const Routing = () => (
  <AnimatePresence>
    <Routes>
      <Route path="/" element={<PreviewPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
    </Routes>
  </AnimatePresence>
)

export default memo(Routing)
