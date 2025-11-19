import { useEffect } from 'react'

export default function Hero({ onGetStarted }) {
  useEffect(() => {
    // no-op for now
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-rose-500/10 blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-200 text-xs mb-4">
            <span>New</span>
            <span className="h-1 w-1 rounded-full bg-blue-300 inline-block" />
            <span>Designed for Nepali singles</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Find your person.
            <span className="block bg-gradient-to-r from-blue-300 via-rose-300 to-amber-300 bg-clip-text text-transparent">Real connections. Real vibes.</span>
          </h1>
          <p className="mt-4 text-blue-200 text-lg md:text-xl max-w-xl">
            A fresh, modern dating experience built for authenticity. Thoughtful profiles, meaningful matches, and a kinder way to meet.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button onClick={onGetStarted} className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition">
              Get started
            </button>
            <a href="#features" className="px-6 py-3 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/15 transition">
              Learn more
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm text-blue-300">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_,i)=>(
                <img key={i} src={`https://i.pravatar.cc/48?img=${i+10}`} alt="user" className="h-8 w-8 rounded-full border border-white/20" />
              ))}
            </div>
            <span>Join thousands finding better matches</span>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur p-4">
            <img src="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1200&auto=format&fit=crop" alt="app preview" className="rounded-xl object-cover aspect-[4/5] w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
