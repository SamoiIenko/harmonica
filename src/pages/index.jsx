import { memo } from "react";

const { AnimatePresence } = require("framer-motion");
const { Routes, Route } = require("react-router-dom");

const Routing = () => (
  <AnimatePresence>
    <Routes>
      <Route path="*" element={<GuestRouter />}></Route>
    </Routes>
  </AnimatePresence>
);

export default memo(Routing);
