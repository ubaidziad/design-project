import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import LoanQuote from './pages/LoanQuote'
import LoanConfirmation from './pages/LoanConfirmation'
import LoanManagement from './pages/LoanManagement'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/loan-quote" element={<LoanQuote />} />
            <Route path="/loan-confirmation" element={<LoanConfirmation />} />
            <Route path="/loan-management" element={<LoanManagement />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
