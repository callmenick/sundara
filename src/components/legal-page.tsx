interface LegalPageProps {
  title: string
  lastUpdated?: string
  children: React.ReactNode
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="font-heading text-forest text-3xl sm:text-4xl">{title}</h1>
        {lastUpdated && <p className="text-forest/60 mt-4 text-sm">Last updated: {lastUpdated}</p>}
      </header>
      <div className="prose prose-forest max-w-none">{children}</div>
    </div>
  )
}
