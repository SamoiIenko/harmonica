import { HelmetProvider } from 'react-helmet-async'

// eslint-disable-next-line react/display-name
export const withHelmet = (component) => () =>
  <HelmetProvider>{component()}</HelmetProvider>
