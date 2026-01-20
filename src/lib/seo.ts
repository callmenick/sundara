import { FESTIVAL } from '@/lib/constants'

export const SEO = {
  siteName: 'Sundara',
  titleTemplate: '%s | Sundara',

  home: {
    title: `Sundara ${FESTIVAL.year} | ${FESTIVAL.tagline} in ${FESTIVAL.location.country}`,
    description: `Join us for Sundara ${FESTIVAL.year} – a weekend ${FESTIVAL.tagline.toLowerCase()} featuring LIVE indie & rock and RAVE electronic music stages, workshops, and community in ${FESTIVAL.location.country}. ${FESTIVAL.formatted.dateRange} at ${FESTIVAL.location.shortName}.`,
  },

  defaults: {
    description: `Sundara is a ${FESTIVAL.tagline.toLowerCase()} in ${FESTIVAL.location.country} featuring two stages (LIVE & RAVE), workshops, local vendors, and a community that celebrates creativity and connection.`,
  },

  keywords: [
    'Sundara',
    'music festival',
    'Trinidad and Tobago',
    'camping festival',
    'indie rock',
    'electronic music',
    'LIVE stage',
    'RAVE stage',
    FESTIVAL.location.venue,
    FESTIVAL.location.area,
  ],

  openGraph: {
    type: 'website' as const,
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image' as const,
  },
}

export const COPY = {
  tagline: FESTIVAL.tagline,
  taglineWithArticle: `A ${FESTIVAL.tagline}`,

  hero: {
    tagline: FESTIVAL.tagline,
    location: FESTIVAL.location.country,
    dates: FESTIVAL.formatted.dateRange,
  },

  about: {
    headline: 'Two Stages. One Weekend.',
    intro: `Sundara brings together two distinct musical experiences under the Caribbean sky. The LIVE stage features indie and rock acts, while the RAVE stage delivers electronic and house music deep into the night.`,
    extended: `Beyond the music, discover workshops, local food vendors, art installations, and a community that celebrates creativity and connection.`,
  },

  footer: {
    description: `A weekend ${FESTIVAL.tagline.toLowerCase()} in ${FESTIVAL.location.country} featuring LIVE and RAVE stages, workshops, and community.`,
  },
}
