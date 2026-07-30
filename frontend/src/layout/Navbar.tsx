export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <h1 className="text-lg font-bold text-emerald-700">Project Adhikaar</h1>

        <nav className="hidden gap-8 text-sm text-slate-600 md:flex">
          <a href="#problem">Problem</a>
          <a href="#workflow">Workflow</a>
          <a href="#architecture">Architecture</a>
          <a href="#roadmap">Roadmap</a>
        </nav>
      </div>
    </header>
  );
}
