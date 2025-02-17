import { memo } from 'react'
import MainPage from './main'

const { AnimatePresence } = require('framer-motion')
const { Routes, Route } = require('react-router-dom')

const Routing = () => (
  <AnimatePresence>
    <Routes>
      <Route index element={<MainPage />}></Route>
      {/* <Route path="*" element={<GuestRouter />}></Route> */}
    </Routes>
  </AnimatePresence>
)

export default memo(Routing)
