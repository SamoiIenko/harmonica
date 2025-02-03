import { motion } from "framer-motion";

const MainPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div></div>
  </motion.div>
);
