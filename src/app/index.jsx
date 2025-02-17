import Routing from '@pages'
import { withHocs } from './providers'

const { Suspense } = require('react')

const App = () => (
  <Suspense fallback="Loading Core...">
    <Routing />
  </Suspense>
)

export default withHocs(App)
