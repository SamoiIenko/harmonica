import { BrowserRouter } from 'react-router-dom'

// eslint-disable-next-line react/display-name
export const withRouter = (component) => () =>
  <BrowserRouter>{component()}</BrowserRouter>
