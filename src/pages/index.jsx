import { AnimatePrecense } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import { memo } from "react";

const Routing = () => (
  <AnimatePrecense>
    <Routes>
      <Route path="/" element={Home} />
    </Routes>
  </AnimatePrecense>
);

export default memo(Routing);
