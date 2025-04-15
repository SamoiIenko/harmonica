import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

import { PageLayout } from './ui'
import { memo } from 'react'
import { PreviewPageWidget } from '@widgets/preview'

const _PreviewPage = () => (
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
        <PreviewPageWidget />
      </PageLayout>
    </div>
  </motion.div>
)

export const PreviewPage = memo(_PreviewPage)
