export default function Footer() {
  return (
    <footer className="py-10">
      <div className="max-w-6xl mx-auto px-6 text-center text-sm text-blue-300/80">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/flame-icon.svg" alt="logo" className="w-6 h-6"/>
          <span className="text-white font-semibold">NepaliLove</span>
        </div>
        <p>Made with care for meaningful connections. © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
