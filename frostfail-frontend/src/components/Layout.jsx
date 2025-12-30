export default function Layout({ children }) {
  return (
    <div className="bg-background-light min-h-screen font-display text-text-main">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">❄️</div>
            <div>
              <h1 className="text-xl font-bold">FrostFail</h1>
              <p className="text-xs text-text-secondary">
                Visual API Chaos Testing Platform
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
