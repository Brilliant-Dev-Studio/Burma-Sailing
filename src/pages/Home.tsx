import { Helmet } from 'react-helmet-async'
import { HeroSection } from '@/components'
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
        <meta name="description" content="Burma Sailing — your trusted yacht agent and passage specialist in the Mergui Archipelago, Myanmar. Expert permits, logistics, and local guidance for visiting yachts." />
        <meta name="keywords" content="Burma Sailing, Mergui Archipelago, yacht agent Myanmar, sailing Myanmar, Kawthaung, cruising permits" />
        <meta property="og:title" content="Burma Sailing | Home" />
        <meta property="og:description" content="Your trusted passage to the Mergui Archipelago. Expert yacht agency services in southern Myanmar." />
        <meta property="og:type" content="website" />
      </Helmet>
     <HeroSection />
    </motion.section>
  )
}
