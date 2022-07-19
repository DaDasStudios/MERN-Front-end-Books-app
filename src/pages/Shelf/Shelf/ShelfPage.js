import { ActionsBooksProvider } from '../../../context/actionsBookContext'
import Container from '../../../components/ui/Container'
import Dashboard from '../Dashboard/Dashboard'

const ShelfPage = () => {
  return (
    <Container>
      <ActionsBooksProvider>
        <Dashboard></Dashboard>
      </ActionsBooksProvider>
    </Container>
  )
}

export default ShelfPage