import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (mode === 'register') {
        const res = await fetch(`${API}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, full_name: name })
        })
        if (!res.ok) throw new Error((await res.json()).detail || 'Failed to register')
      }
      const form = new URLSearchParams()
      form.set('username', email)
      form.set('password', password)
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: form.toString()
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to login')
      localStorage.setItem('token', data.access_token)
      onAuth(data.access_token)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex gap-2 mb-4">
        <button className={`px-3 py-2 rounded ${mode==='login'?'bg-white text-slate-900':'bg-white/10 text-white'}`} onClick={()=>setMode('login')}>Login</button>
        <button className={`px-3 py-2 rounded ${mode==='register'?'bg-white text-slate-900':'bg-white/10 text-white'}`} onClick={()=>setMode('register')}>Register</button>
      </div>
      <form onSubmit={submit} className="space-y-3">
        {mode==='register' && (
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full px-3 py-2 rounded bg-white/10 text-white outline-none" />
        )}
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full px-3 py-2 rounded bg-white/10 text-white outline-none" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-3 py-2 rounded bg-white/10 text-white outline-none" />
        {error && <p className="text-rose-300 text-sm">{error}</p>}
        <button className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold px-4 py-2 rounded">{mode==='login'?'Login':'Create account'}</button>
      </form>
    </div>
  )
}
