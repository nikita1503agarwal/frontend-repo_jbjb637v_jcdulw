import { useMemo, useState } from 'react'

function resolveAPI() {
  const envUrl = import.meta.env.VITE_BACKEND_URL
  if (envUrl) return envUrl
  try {
    const u = new URL(window.location.href)
    // Try switching 3000 -> 8000 for the co-hosted API
    if (u.port === '3000') {
      u.port = '8000'
      return u.origin.replace(':3000', ':8000')
    }
    return u.origin
  } catch {
    return 'http://localhost:8000'
  }
}

export default function Auth({ onAuth }) {
  const defaultAPI = useMemo(resolveAPI, [])
  const [api] = useState(() => localStorage.getItem('api') || defaultAPI)
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const toMessage = async (res) => {
    try {
      const data = await res.json()
      if (data?.detail) return typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail)
      if (data?.message) return data.message
      return res.statusText || 'Request failed'
    } catch {
      return res.statusText || 'Request failed'
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (!email || !password) throw new Error('Please enter email and password')

      if (mode === 'register') {
        const res = await fetch(`${api}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, full_name: name || undefined })
        }).catch(() => { throw new Error('Could not reach server. Check your connection or API URL.') })
        if (!res.ok) throw new Error(await toMessage(res))
      }

      const res = await fetch(`${api}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }).catch(() => { throw new Error('Could not reach server. Check your connection or API URL.') })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.detail || 'Invalid email or password')
      if (!data?.access_token) throw new Error('Login failed: no token received')
      localStorage.setItem('token', data.access_token)
      onAuth(data.access_token)
    } catch (e) {
      setError(typeof e.message === 'string' ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
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
        <button disabled={loading} className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-60 text-white font-semibold px-4 py-2 rounded">{loading? 'Please wait…' : (mode==='login'?'Login':'Create account')}</button>
        <p className="text-xs text-blue-300/80">API: {api}</p>
      </form>
    </div>
  )
}
