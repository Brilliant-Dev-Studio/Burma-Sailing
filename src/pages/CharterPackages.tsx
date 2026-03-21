import { Helmet } from 'react-helmet-async'
import { SITE_OG_IMAGE, canonicalUrl } from '@/lib/siteConfig'
import { motion } from 'framer-motion'

const pageMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export default function CharterPackages() {
  return (
    <motion.section
      variants={pageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      <Helmet>
        <title>Burma Sailing | Charter & Packages</title>
        <link rel="canonical" href={canonicalUrl('/charter-packages')} />
        <meta name="description" content="Explore Burma Sailing's charter and package options — honeymoon island escapes, 4-island day trips, island hopping by sea gypsy wooden boat, and private boat charters in the Mergui Archipelago." />
        <meta name="keywords" content="Myanmar yacht charter, Mergui Archipelago packages, island hopping Myanmar, honeymoon sailing Myanmar, Burma Sailing packages" />
        <meta property="og:url" content={canonicalUrl('/charter-packages')} />
        <meta property="og:title" content="Burma Sailing | Charter & Packages" />
        <meta property="og:description" content="Curated island experiences in the Mergui Archipelago — from romantic escapes to adventure charters." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Burma Sailing" />
        <meta property="og:image" content={SITE_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Burma Sailing | Charter & Packages" />
        <meta name="twitter:description" content="Curated island experiences in the Mergui Archipelago — from romantic escapes to adventure charters." />
        <meta name="twitter:image" content={SITE_OG_IMAGE} />
      </Helmet>
      <h1 className="text-3xl font-semibold">Charter &amp; Packages</h1>
      <p className="text-muted-foreground">
        Choose from flexible itineraries, luxury packages, and bespoke private
        sails.
      </p>
    </motion.section>
  )
}
