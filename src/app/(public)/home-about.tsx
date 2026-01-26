export function HomeAbout() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-forest text-3xl sm:text-4xl md:text-5xl">
          Two Stages. One Weekend.
        </h2>
        <p className="text-forest mt-6 text-lg leading-relaxed">
          Sundara brings together two distinct musical experiences under the Caribbean sky. The{' '}
          <strong className="text-forest">LIVE</strong> stage features indie and rock acts, while
          the <strong className="text-forest">RAVE</strong> stage delivers electronic and house
          music deep into the night.
        </p>
        <p className="text-forest mt-4 text-lg leading-relaxed">
          Beyond the music, discover workshops, local food vendors, art installations, and a
          community that celebrates creativity and connection.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="border-lime/30 rounded-xl border-2 p-6">
            <h3 className="font-heading text-forest text-xl">Music</h3>
            <p className="text-forest/60 mt-2 text-sm">
              Two stages featuring local and international artists across indie, rock, and
              electronic genres.
            </p>
          </div>
          <div className="border-lime/30 rounded-xl border-2 p-6">
            <h3 className="font-heading text-forest text-xl">Camping</h3>
            <p className="text-forest/60 mt-2 text-sm">
              Pitch your tent under the stars and wake up to the sounds of nature and community.
            </p>
          </div>
          <div className="border-lime/30 rounded-xl border-2 p-6">
            <h3 className="font-heading text-forest text-xl">Workshops</h3>
            <p className="text-forest/60 mt-2 text-sm">
              Yoga, art, wellness, and skill-sharing sessions throughout the weekend.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
