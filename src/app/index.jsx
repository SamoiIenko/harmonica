import Routing from '@pages'
const { Suspense } = require('react')

const App = () => (
  <Suspense fallback="Loading Core...">
    <Routing />
  </Suspense>
)

export default App
