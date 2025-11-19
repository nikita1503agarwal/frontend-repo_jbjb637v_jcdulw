import { useEffect, useState } from 'react'
import Auth from './components/Auth'
import Discover from './components/Discover'
import Matches from './components/Matches'

function Navbar({ token, onLogout }) {
  return (
    <div className="sticky top-0 z-10 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8"/>
          <span className="text-white font-semibold">NepaliLove</span>
        </div>
        {token && (
          <button onClick={onLogout} className="text-sm text-blue-200 hover:text-white">Logout</button>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [tab, setTab] = useState('discover')

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <Navbar token={token} onLogout={logout} />
        <div className="max-w-6xl mx-auto mt-10">
          <h1 className="text-4xl font-bold text-white mb-6">Find your match</h1>
          <p className="text-blue-200 mb-6">Create an account or sign in to start discovering people around you.</p>
          <Auth onAuth={setToken} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar token={token} onLogout={logout} />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6">
          <button onClick={()=>setTab('discover')} className={`px-4 py-2 rounded ${tab==='discover'?'bg-white text-slate-900':'bg-white/10 text-white'}`}>Discover</button>
          <button onClick={()=>setTab('matches')} className={`px-4 py-2 rounded ${tab==='matches'?'bg-white text-slate-900':'bg-white/10 text-white'}`}>Matches</button>
        </div>
        {tab==='discover' ? <Discover token={token} /> : <Matches token={token} />}
      </div>
    </div>
  )
}
