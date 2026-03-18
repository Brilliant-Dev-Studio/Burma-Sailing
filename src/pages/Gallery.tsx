import { motion } from 'framer-motion'

const pageMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export default function Gallery() {
  return (
    <motion.section
      variants={pageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      <h1 className="text-3xl font-semibold">Gallery</h1>
      <p className="text-muted-foreground">
        Moments at sea, captured from sunrise to starlight.
      </p>
    </motion.section>
  )
}
