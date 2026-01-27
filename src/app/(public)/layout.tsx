import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="from-sand mt-(--header-height) flex-1 bg-linear-to-b to-white">
        {children}
      </main>
      <Footer />
    </div>
  )
}
