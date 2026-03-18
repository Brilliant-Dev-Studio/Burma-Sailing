import { motion } from 'framer-motion'

const pageMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export default function Services() {
  return (
    <motion.section
      variants={pageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      <h1 className="text-3xl font-semibold">Services</h1>
      <p className="text-muted-foreground">
        From luxury charters to crewed expeditions, we tailor every detail.
      </p>
    </motion.section>
  )
}
