import { Helmet } from 'react-helmet-async'
import { HeroSection } from '@/components'
import { SITE_OG_IMAGE, canonicalUrl } from '@/lib/siteConfig'
import { motion } from 'framer-motion'

const pageMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export default function Home() {
  return (
    <motion.section
      variants={pageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className=""
    >
      <Helmet>
        <title>Burma Sailing | Home</title>
        <link rel="canonical" href={canonicalUrl('/')} />
        <meta name="description" content="Burma Sailing — your trusted yacht agent and passage specialist in the Mergui Archipelago, Myanmar. Expert permits, logistics, and local guidance for visiting yachts." />
        <meta name="keywords" content="Burma Sailing, Mergui Archipelago, yacht agent Myanmar, sailing Myanmar, Kawthaung, cruising permits" />
        <meta property="og:url" content={canonicalUrl('/')} />
        <meta property="og:title" content="Burma Sailing | Home" />
        <meta property="og:description" content="Your trusted passage to the Mergui Archipelago. Expert yacht agency services in southern Myanmar." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Burma Sailing" />
        <meta property="og:image" content={SITE_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Burma Sailing | Home" />
        <meta name="twitter:description" content="Your trusted passage to the Mergui Archipelago. Expert yacht agency services in southern Myanmar." />
        <meta name="twitter:image" content={SITE_OG_IMAGE} />
      </Helmet>
      <HeroSection />
    </motion.section>
  )
}
