import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const seq = {
  hidden:  { opacity: 0, y: 14 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.52, ease, delay: d },
  }),
}

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative min-h-[90svh] flex flex-col"
    >
      <Helmet>
        <title>Burma Sailing | Page Not Found</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="Oops — this page doesn't exist. Navigate back to Burma Sailing and explore the Mergui Archipelago." />
      </Helmet>
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden rounded-b-2xl">
        <img
          src="/IMG_2671.JPG"
          alt="Mergui Archipelago"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center py-20">
        <motion.p
          custom={0.1}
          variants={seq}
          initial="hidden"
          animate="visible"
          className="text-[11px] uppercase tracking-[0.26em] text-white/50 font-semibold"
        >
          Burma Sailing
        </motion.p>

        <motion.h1
          custom={0.22}
          variants={seq}
          initial="hidden"
          animate="visible"
          className="mt-4 text-[110px] md:text-[160px] font-[800] leading-none text-white/10 select-none"
        >
          404
        </motion.h1>

        <motion.p
          custom={0.34}
          variants={seq}
          initial="hidden"
          animate="visible"
          className="mt-2 text-[26px] md:text-[32px] font-[600] text-white leading-snug"
        >
          Lost at sea.
        </motion.p>

        <motion.p
          custom={0.46}
          variants={seq}
          initial="hidden"
          animate="visible"
          className="mt-4 text-[15px] text-white/60 max-w-[36ch] leading-relaxed"
        >
          The page you're looking for doesn't exist — but the Mergui
          Archipelago is still out there waiting.
        </motion.p>

        <motion.div
          custom={0.58}
          variants={seq}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col sm:flex-row gap-3 items-center"
        >
          <a
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-[14px] font-semibold text-black hover:bg-white/90 transition-colors"
          >
            Back to Home
          </a>
          <a
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-8 text-[14px] font-semibold text-white hover:bg-white/20 transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* Bottom nav hint */}
      <motion.div
        custom={0.7}
        variants={seq}
        initial="hidden"
        animate="visible"
        className="relative z-10 pb-10 flex items-center justify-center gap-6 text-[13px] text-white/40"
      >
        {[
          { label: 'Services', href: '/services' },
          { label: 'Destinations', href: '/destinations' },
          { label: 'Gallery', href: '/gallery' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:text-white/70 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </motion.div>
    </motion.div>
  )
}
