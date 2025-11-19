import { useState } from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import Auth from './components/Auth'

function Navbar({ onGetStarted }) {
  return (
    <div className="sticky top-0 z-10 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8"/>
          <span className="text-white font-semibold">NepaliLove</span>
        </div>
        <button onClick={onGetStarted} className="text-sm text-blue-200 hover:text-white">Get started</button>
      </div>
    </div>
  )
}

export default function App() {
  const [showAuth, setShowAuth] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token'))

  const handleAuthed = (tok) => {
    localStorage.setItem('token', tok)
    setToken(tok)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <Navbar onGetStarted={() => setShowAuth(true)} />
        <Hero onGetStarted={() => setShowAuth(true)} />
        <Features />
        <div className="max-w-6xl mx-auto px-6">
          {showAuth && (
            <div className="mt-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <Auth onAuth={handleAuthed} />
              </div>
              <p className="text-blue-300 text-sm mt-2">Have an account? Log in. New here? Create one in seconds.</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }

  // Simple post-auth placeholder
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="sticky top-0 z-10 backdrop-blur bg-slate-900/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/flame-icon.svg" alt="logo" className="w-8 h-8"/>
            <span className="text-white font-semibold">NepaliLove</span>
          </div>
          <button onClick={logout} className="text-sm text-blue-200 hover:text-white">Logout</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-4">You're in!</h2>
        <p className="text-blue-200 mb-6">We'll wire up Discover, Matches, and Chat after we stabilize auth. For now, this confirms a successful sign-in.</p>
        <button onClick={logout} className="px-4 py-2 rounded bg-white text-slate-900 font-semibold">Logout</button>
      </div>
      <Footer />
    </div>
  )
}
