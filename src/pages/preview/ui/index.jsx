import { Container } from 'react-bootstrap'

export const PageLayout = ({ children }) => (
  <Container fluid className="p-0">
    {children}
  </Container>
)
