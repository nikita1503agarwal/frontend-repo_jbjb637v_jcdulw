import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-700 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6">
        <h1 className="text-4xl font-bold leading-tight sm:text-6xl">Create short, viral clips from any link</h1>
        <p className="mt-4 max-w-2xl text-lg/relaxed text-indigo-100">Paste a video link and we’ll generate a scroll-stopping, social-ready snippet with captions, music beats, and trendy layout automatically.</p>
        <a href="#generator" className="mt-8 inline-flex items-center rounded-full bg-white/90 px-6 py-3 font-semibold text-indigo-800 shadow hover:bg-white">Try it now</a>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-900/70" />
    </section>
  )
}

function ClipCard({ clip }) {
  return (
    <div className="rounded-xl bg-white/5 p-4 backdrop-blur ring-1 ring-white/10">
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-black/60">
        <img src={clip.cover_url || 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop'} alt="cover" className="h-full w-full object-cover" />
      </div>
      <div className="mt-3">
        <h3 className="font-semibold text-white">{clip.title}</h3>
        <p className="mt-1 text-sm text-indigo-200 line-clamp-2">{clip.description}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-indigo-300">
          <span>❤ {clip.likes}</span>
          <span>↗ {clip.shares}</span>
          <span>💬 {clip.comments_count}</span>
        </div>
      </div>
    </div>
  )
}

function Generator() {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('My viral clip')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [created, setCreated] = useState(null)

  const create = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setCreated(null)
    try {
      const res = await fetch(`${BACKEND_URL}/clips`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: 'Auto-generated from link',
          video_url: url || 'https://example.com/video.mp4',
          cover_url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop',
          creator: { username: 'guest', display_name: 'Guest' },
          tags: ['auto', 'social', 'clip']
        })
      })
      if (!res.ok) throw new Error('Failed to create')
      const data = await res.json()
      setCreated(data)
      setUrl('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="generator" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-bold text-white sm:text-3xl">Turn any video link into a social-ready clip</h2>
      <p className="mt-2 text-indigo-200">Paste a link, add a title, and we’ll do the rest.</p>
      <form onSubmit={create} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_auto]">
        <input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="Paste video URL (TikTok, YouTube, etc.)" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-indigo-300 outline-none focus:ring-2 focus:ring-indigo-400" />
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-indigo-300 outline-none focus:ring-2 focus:ring-indigo-400" />
        <button disabled={loading} className="rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white shadow hover:bg-indigo-400 disabled:opacity-50">{loading ? 'Creating…' : 'Generate'}</button>
      </form>
      {error && <p className="mt-3 text-rose-300">{error}</p>}
      {created && (
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-white">
          <p className="text-sm text-indigo-200">Created!</p>
          <pre className="mt-2 overflow-auto whitespace-pre-wrap rounded bg-black/40 p-3 text-xs">{JSON.stringify(created, null, 2)}</pre>
        </div>
      )}
    </section>
  )
}

function Gallery() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/clips`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">Trending clips</h2>
      {loading ? (
        <p className="text-indigo-200">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => <ClipCard key={i} clip={c} />)}
        </div>
      )}
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-indigo-900">
      <Hero />
      <Generator />
      <Gallery />
      <footer className="border-t border-white/10 py-8 text-center text-indigo-300">Made for creators who move fast.</footer>
    </div>
  )
}
