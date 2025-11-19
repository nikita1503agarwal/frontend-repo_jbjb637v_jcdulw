import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Card({ user, onLike }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
      <div className="aspect-[3/4] bg-slate-700/40 relative">
        <img src={user.photos?.[0] || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop'} alt="profile" className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="text-white text-lg font-semibold">{user.full_name || user.email}</div>
          <div className="text-blue-200 text-sm">{user.bio || 'Loves coffee and sunsets ☕️🌅'}</div>
        </div>
      </div>
      <div className="p-4 flex items-center justify-center gap-4">
        <button onClick={()=>onLike(user)} className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-400">Like</button>
      </div>
    </div>
  )
}

export default function Discover({ token }) {
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')

  useEffect(()=>{
    const run = async () => {
      const res = await fetch(`${API}/discover`, { headers: { Authorization: `Bearer ${token}` }})
      const data = await res.json()
      setUsers(data)
    }
    run()
  }, [token])

  const like = async (u) => {
    const res = await fetch(`${API}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ target_user_id: u.id })
    })
    const data = await res.json()
    if (data.match) setMessage('It\'s a match! 🎉 Start a chat in Matches tab.')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {message && <div className="md:col-span-3 text-center text-green-300">{message}</div>}
      {users.map(u => <Card key={u.id} user={u} onLike={like} />)}
    </div>
  )
}
