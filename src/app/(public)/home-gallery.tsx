'use client'

import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const images = [
  { src: '/media/dj1.jpg', alt: 'DJ performing at Sundara' },
  { src: '/media/art2.jpg', alt: 'Art installation at Sundara' },
  { src: '/media/music1.jpg', alt: 'Live music at Sundara' },
  // { src: '/media/party2.jpg', alt: 'Festival crowd at Sundara' },
  { src: '/media/yoga1.jpg', alt: 'Yoga session at Sundara' },
  { src: '/media/workshop1.jpg', alt: 'Workshop at Sundara' },
  { src: '/media/music2.jpg', alt: 'Musicians performing at Sundara' },
  // { src: '/media/party1.jpg', alt: 'Festival atmosphere at Sundara' },
]

export function HomeGallery() {
  return (
    <section className="bg-forest/90 relative z-20 py-24 backdrop-blur-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-sand text-center text-3xl sm:text-4xl md:text-5xl">
          The Experience
        </h2>
        <p className="text-sand/70 mx-auto mt-6 max-w-2xl text-center text-lg">
          A glimpse into what awaits you at Sundara.
        </p>

        <div className="mx-auto mt-12 max-w-6xl">
          <Carousel
            opts={{
              loop: true,
              align: 'center',
            }}
            plugins={[
              Fade(),
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="grid grid-cols-[max-content_1fr_max-content] items-center gap-4"
          >
            <CarouselPrevious className="border-sand/30 text-sand hover:bg-sand hover:text-forest static translate-y-0 bg-transparent disabled:opacity-30" />
            <CarouselContent className="box-shadow-sand/20 shadow-2xl">
              {images.map((image, i) => (
                <CarouselItem key={i} className="basis-full">
                  <div className="bg-sand/10 relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1152px) 100vw, 1152px"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="border-sand/30 text-sand hover:bg-sand hover:text-forest static translate-y-0 bg-transparent disabled:opacity-30" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
