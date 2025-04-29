import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

import { PageLayout } from './ui'
import { memo } from 'react'
import { CreatePageWidget } from '@widgets/create'

const _CreatePage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div>
      <Helmet>
        <title>Create sound page</title>
      </Helmet>
      <PageLayout>
        <CreatePageWidget />
      </PageLayout>
    </div>
  </motion.div>
)

export const CreatePage = memo(_CreatePage)
