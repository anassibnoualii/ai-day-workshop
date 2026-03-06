import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import LivePage from './pages/LivePage'
import AdminPage from './pages/AdminPage'
import RulesPage from './pages/RulesPage'
import FeedbackRedirect from './pages/FeedbackRedirect'
import ScoreboardPage from './pages/ScoreboardPage'
import { ToastProvider } from './components/shared/Toast'

export default function App() {
  return (
    <ToastProvider>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white font-sans text-dark-slate">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="flex-1">
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-slate-gray">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/live" element={<LivePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/scoreboard" element={<ScoreboardPage />} />
              <Route path="/feedback" element={<FeedbackRedirect />} />
            </Routes>
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </BrowserRouter>
    </ToastProvider>
  )
}
