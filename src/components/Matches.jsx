import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Matches({ token }) {
  const [items, setItems] = useState([])
  const [active, setActive] = useState(null)
  const [text, setText] = useState('')

  useEffect(()=>{
    const run = async () => {
      const res = await fetch(`${API}/matches`, { headers: { Authorization: `Bearer ${token}` }})
      const data = await res.json()
      setItems(data.items || [])
      if ((data.items || []).length) setActive((data.items || [])[0])
    }
    run()
  }, [token])

  useEffect(()=>{
    const load = async () => {
      if (!active) return
      const res = await fetch(`${API}/messages/${active.id}`, { headers: { Authorization: `Bearer ${token}` }})
      const data = await res.json()
      setActive(a => ({ ...a, messages: data.items }))
    }
    load()
  }, [active?.id, token])

  const send = async (e) => {
    e.preventDefault()
    if (!active || !text.trim()) return
    await fetch(`${API}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ match_id: active.id, text })
    })
    setText('')
    const res = await fetch(`${API}/messages/${active.id}`, { headers: { Authorization: `Bearer ${token}` }})
    const data = await res.json()
    setActive(a => ({ ...a, messages: data.items }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2 md:col-span-1">
        {(items || []).map(it => (
          <button key={it.id} onClick={()=>setActive(it)} className={`w-full text-left p-3 rounded-lg border ${active?.id===it.id?'border-blue-400 bg-white/10':'border-white/10 bg-white/5'} text-white`}>
            <div className="font-semibold">{it.other?.full_name || it.other?.email}</div>
            <div className="text-sm text-blue-200">Matched</div>
          </button>
        ))}
      </div>
      <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col min-h-[400px]">
        {active ? (
          <>
            <div className="flex-1 space-y-2 overflow-auto">
              {(active.messages || []).map(m => (
                <div key={m.id} className={`max-w-[70%] p-2 rounded-lg ${m.sender_id===active.other?.id? 'bg-white/10':'bg-blue-500/80 ml-auto' } text-white`}>
                  {m.text}
                </div>
              ))}
            </div>
            <form onSubmit={send} className="mt-3 flex gap-2">
              <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message" className="flex-1 px-3 py-2 rounded bg-white/10 text-white" />
              <button className="px-4 py-2 bg-blue-500 text-white rounded">Send</button>
            </form>
          </>
        ) : (
          <div className="text-blue-200">No match selected.</div>
        )}
      </div>
    </div>
  )
}
