import { motion } from 'framer-motion'

const pageMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export default function Destinations() {
  return (
    <motion.section
      variants={pageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      <h1 className="text-3xl font-semibold">Destinations</h1>
      <p className="text-muted-foreground">
        Explore hidden coves, island chains, and iconic coastlines.
      </p>
    </motion.section>
  )
}
