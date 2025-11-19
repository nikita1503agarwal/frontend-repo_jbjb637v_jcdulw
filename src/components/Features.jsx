export default function Features() {
  const items = [
    {
      title: "Thoughtful profiles",
      desc: "Prompt-based bios, interests, and verified photos show the real you.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 2a5 5 0 015 5v1h1a4 4 0 110 8h-1v1a5 5 0 11-10 0v-1H6a4 4 0 110-8h1V7a5 5 0 015-5z" />
        </svg>
      ),
    },
    {
      title: "Kind matching",
      desc: "Smart discovery with safety-first design to reduce burnout.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 21s-7-4.35-7-10a5 5 0 019-3 5 5 0 019 3c0 5.65-7 10-7 10s-2-.95-4-2.5" />
        </svg>
      ),
    },
    {
      title: "Real-time chat",
      desc: "Continue the vibe with smooth, private messaging once you match.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M4 5h16v10H7l-3 3V5z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="features" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, idx) => (
            <div key={idx} className="rounded-2xl p-6 bg-white/5 border border-white/10 text-white">
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-300 mb-4">
                {it.icon}
              </div>
              <div className="text-lg font-semibold">{it.title}</div>
              <p className="text-blue-200 mt-1">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
