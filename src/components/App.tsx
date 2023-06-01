import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

function App() {
  return (
    <main id='App'>
      <Header />
      <Outlet />
      <Footer />
    </main>
  )
}

export default App
