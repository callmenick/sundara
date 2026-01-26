import { HomeHero } from './home-hero'
import { HomeAbout } from './home-about'
import { HomeGallery } from './home-gallery'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { Separator } from '@/components/ui/separator'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeGallery />
      <HomeAbout />
      <Separator className="bg-forest/10" />
      <NewsletterSignup />
    </>
  )
}
