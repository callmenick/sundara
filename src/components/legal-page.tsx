interface LegalPageProps {
  title: string
  lastUpdated?: string
  children: React.ReactNode
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {lastUpdated && (
          <p className="text-muted-foreground mt-4 text-sm">Last updated: {lastUpdated}</p>
        )}
      </header>
      <div className="prose prose-zinc dark:prose-invert max-w-none">{children}</div>
    </div>
  )
}
