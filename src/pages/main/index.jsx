import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import { PageLayout } from "./ui";
import { memo } from "react";
import { MainPageWidget } from "@widgets/main";

const MainPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div>
      <Helmet>
        <title>Harmonica</title>
      </Helmet>
      <PageLayout>
        <MainPageWidget />
      </PageLayout>
    </div>
  </motion.div>
);

export default memo(MainPage);
