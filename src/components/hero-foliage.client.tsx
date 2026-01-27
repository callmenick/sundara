import Image from 'next/image'

export function HeroFoliage() {
  return (
    <>
      {/* Bottom-left: leaf and birds */}
      <div className="pointer-events-none absolute bottom-0 -left-[20%] z-0 w-[60%] sm:left-0 sm:w-[40%] md:w-[35%] lg:w-[30%]">
        <Image
          src="/art/leaf-and-birds.png"
          alt=""
          width={600}
          height={600}
          className="h-auto w-full"
          priority
        />
      </div>

      {/* Bottom-right: foliage */}
      <div className="pointer-events-none absolute -right-[30%] bottom-0 z-0 w-[55%] sm:right-0 sm:w-[40%] md:w-[35%] lg:w-[30%]">
        <Image
          src="/art/foliage.png"
          alt=""
          width={600}
          height={600}
          className="h-auto w-full"
          priority
        />
      </div>
    </>
  )
}
