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
import ParticipantGate from './components/shared/ParticipantGate'
import { ToastProvider } from './components/shared/Toast'

export default function App() {
  return (
    <ToastProvider>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white font-sans text-dark-slate">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-slate-gray">Loading...</div>}>
            <Routes>
              <Route path="/" element={<ParticipantGate><HomePage /></ParticipantGate>} />
              <Route path="/live" element={<ParticipantGate><LivePage /></ParticipantGate>} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/rules" element={<ParticipantGate><RulesPage /></ParticipantGate>} />
              <Route path="/scoreboard" element={<ParticipantGate><ScoreboardPage /></ParticipantGate>} />
              <Route path="/feedback" element={<ParticipantGate><FeedbackRedirect /></ParticipantGate>} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </ToastProvider>
  )
}
