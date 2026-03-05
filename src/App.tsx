import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import LivePage from './pages/LivePage'
import AdminPage from './pages/AdminPage'
import RulesPage from './pages/RulesPage'
import FeedbackRedirect from './pages/FeedbackRedirect'

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-gray">Loading...</div>}>
        <div className="min-h-screen flex flex-col bg-white font-sans text-dark-slate">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/live" element={<LivePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/feedback" element={<FeedbackRedirect />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Suspense>
    </BrowserRouter>
  )
}
