import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  motion, useScroll, useTransform, AnimatePresence,
  useInView, useMotionValue, animate as fmAnimate,
} from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const seq = {
  hidden:  { opacity: 0, y: 14 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease, delay: d },
  }),
}

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease } },
}

const stagger = (gap: number, delay = 0) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
})

const pageMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
}

const coreServices = [
  { n: '01', title: 'Cruising Permits & Pre-arrival Coordination' },
  { n: '02', title: 'Licensed Guides & Regulatory Compliance' },
  { n: '03', title: 'Immigration, Customs & Port Clearance' },
  { n: '04', title: 'Itinerary Planning for Remote Island Cruising' },
  { n: '05', title: 'Local Logistics & Provisioning Support' },
  { n: '06', title: 'Liaison with Authorities & Communities' },
  { n: '07', title: 'Practical Solutions Tailored to Each Yacht' },
]

const packages = [
  {
    badge: (
      <span className="inline-flex items-center rounded-full bg-rose-300 px-4 py-1 text-[12px] font-bold uppercase tracking-widest text-rose-900">
        Romance
      </span>
    ),
    title: 'Honeymoon Island\nDay Return',
    desc: "An intimate escape to one of the Archipelago's most secluded island shores. Perfect for couples seeking untouched beauty and absolute privacy.",
    highlights: ['Private island access', 'Full-day itinerary', 'Local guide included', 'Return transfer'],
    img: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773995357/IMG_2703_lpeawx.jpg',
  },
  {
    badge: (
      <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-amber-300">
        <span className="text-[18px] leading-none">↗</span> Adventure
      </span>
    ),
    title: "Cock's Comb\n4 Islands Trip",
    desc: "An exhilarating day voyage covering four distinct islands around Cock's Comb — each with its own character, wildlife, and anchorages.",
    highlights: ['4 island stops', 'Snorkeling spots', 'Wildlife sightings', 'Full-day guided'],
    img: '/IMG_2671.JPG',
  },
  {
    badge: (
      <span className="inline-flex items-center border border-emerald-400/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
        Cultural
      </span>
    ),
    title: 'Island Hopping by\nSea Gypsy Boat',
    desc: 'Experience the Archipelago as it has been for centuries — aboard a traditional wooden Sea Gypsy vessel, navigating between islands with local knowledge at the helm.',
    highlights: ['Traditional wooden boat', 'Sea Gypsy culture', 'Multi-island route', 'Authentic experience'],
    img: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983756/viber_image_2026-03-20_08-30-49-219_pxdk4u.jpg',
  },
  {
    badge: (
      <span className="inline-flex items-center gap-2.5 text-[13px] font-medium tracking-[0.12em] text-white/70">
        <span className="h-2 w-2 rounded-full bg-sky-400 shrink-0" />
        Charter
      </span>
    ),
    title: 'Private Boat\nRental & Charter',
    desc: 'Full vessel rental for independent exploration. Customise your route, duration, and pace — we handle all logistics, permits, and crew support.',
    highlights: ['Flexible itinerary', 'Crew & captain', 'All permits included', 'Custom duration'],
    img: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983729/viber_image_2026-03-19_09-03-30-685_tkdahn.jpg',
  },
]

// ── Wave fill layer ───────────────────────────────────────────────────────
function WaveLayer({ fillPct, isInView, delay }: { fillPct: number; isInView: boolean; delay: number }) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
      initial={{ height: '0%' }}
      animate={isInView ? { height: `${fillPct}%` } : { height: '0%' }}
      transition={{ duration: 1.9, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Wave 1 — forward, lighter crest */}
      <motion.div
        className="absolute -top-4 left-0 h-8"
        style={{ width: '200%' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="100%" height="100%" viewBox="0 0 600 32" preserveAspectRatio="none">
          <path
            d="M0,16 C50,0 100,32 150,16 C200,0 250,32 300,16 C350,0 400,32 450,16 C500,0 550,32 600,16 L600,32 L0,32 Z"
            fill="rgba(125,211,252,0.45)"
          />
        </svg>
      </motion.div>

      {/* Wave 2 — reverse, deeper tone */}
      <motion.div
        className="absolute -top-2 left-0 h-6"
        style={{ width: '200%' }}
        animate={{ x: ['-50%', '0%'] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="100%" height="100%" viewBox="0 0 600 24" preserveAspectRatio="none">
          <path
            d="M0,12 C75,24 150,0 225,12 C300,24 375,0 450,12 C525,24 600,0 600,12 L600,24 L0,24 Z"
            fill="rgba(56,189,248,0.28)"
          />
        </svg>
      </motion.div>

      {/* Solid water body — deep ocean blue */}
      <div className="absolute inset-0 top-5" style={{ background: 'rgba(14,116,144,0.32)' }} />
    </motion.div>
  )
}

// ── Animated tidal stat card ──────────────────────────────────────────────
function TideStatCard({
  value, max, label, delay,
}: { value: number; max: number; label: string; delay: number }) {
  const ref       = useRef<HTMLDivElement>(null)
  const isInView  = useInView(ref, { once: true, amount: 0.5 })
  const count     = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  const fillPct = (value / max) * 100

  useEffect(() => {
    if (!isInView) return
    const ctrl = fmAnimate(count, value, {
      duration: 1.6,
      delay: delay + 0.2,
      ease: [0.22, 1, 0.36, 1],
    })
    const unsub = count.on('change', (v) => setDisplay(Math.round(v)))
    return () => { ctrl.stop(); unsub() }
  }, [isInView, count, value, delay])

  return (
    <motion.div
      ref={ref}
      className="flex-1 md:flex-none relative rounded-2xl border border-sky-400/20 bg-sky-950/30 px-6 md:px-8 py-7 text-center overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -5,
        borderColor: 'rgba(125,211,252,0.45)',
        boxShadow: '0 0 40px rgba(14,116,144,0.35)',
        transition: { duration: 0.25 },
      }}
    >
      {/* Wave fill — rises to fillPct of the card height */}
      <WaveLayer fillPct={fillPct} isInView={isInView} delay={delay} />

      {/* Content sits above the wave */}
      <div className="relative z-10">
        {/* Fill level label */}
        <p className="text-[11px] text-white/30 uppercase tracking-widest mb-3">
          {Math.round(fillPct)}% fill
        </p>

        {/* Count-up */}
        <p className="text-[48px] md:text-[52px] font-[300] text-white tabular-nums leading-none">
          {display}
          <span className="text-[26px] text-white/50 ml-0.5">m</span>
        </p>
        <p className="mt-2 text-[11px] text-white/40 uppercase tracking-wider">{label}</p>
      </div>

      {/* Ambient bottom glow */}
      <div className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 h-14 w-28 rounded-full bg-cyan-400/25 blur-2xl" />
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Services() {
  const heroRef  = useRef<HTMLDivElement>(null)
  const ctaRef   = useRef<HTMLDivElement>(null)
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  })
  const ctaImgY = useTransform(ctaScroll, [0, 1], [-50, 50])

  const [activeIdx, setActiveIdx]   = useState<number>(0)
  const [paused, setPaused]         = useState(false)

  // Auto-cycle every 5 s; pause while user is hovering
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % packages.length)
    }, 5000)
    return () => clearInterval(id)
  }, [paused])
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <motion.div
      variants={pageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
    >
      <Helmet>
        <title>Burma Sailing | Services</title>
        <meta name="description" content="Burma Sailing offers complete yacht services in Myanmar — cruising permits, port clearance, licensed guides, itinerary planning, and charter packages in the Mergui Archipelago." />
        <meta name="keywords" content="Burma Sailing services, Myanmar cruising permits, Mergui charter, yacht logistics Myanmar, island hopping Myanmar" />
        <meta property="og:title" content="Burma Sailing | Services" />
        <meta property="og:description" content="From permits to passage — complete yacht services for the Mergui Archipelago." />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* ── Hero (parallax) ── */}
      <div
        ref={heroRef}
        className="relative h-[84svh] overflow-hidden rounded-b-[4px]"
      >
        <motion.img
          src="https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993970/viber_image_2026-03-19_08-58-20-077_vjrvvw.jpg"
          alt="Burma Sailing Services"
          style={{ y: heroImgY }}
          className="w-full h-[120%] object-cover object-center will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/70" />
        <motion.div
          className="absolute bottom-[50px] left-[4%] md:left-[6%] lg:left-[8%] text-white max-w-[90%] md:max-w-[60%] lg:max-w-[50%]"
          initial="hidden"
          animate="visible"
        >
          <motion.p custom={0.1} variants={seq} className="text-sm mb-3 tracking-wide">
            Burma Sailing
          </motion.p>
          <motion.h1
            custom={0.22} variants={seq}
            className="text-[32px] md:text-[48px] lg:text-[58px] xl:text-[68px] font-[600] leading-tight"
          >
            Services & Experiences
          </motion.h1>
          <motion.p
            custom={0.34} variants={seq}
            className="mt-3 text-white/75 text-[14px] md:text-[16px] max-w-[40ch]"
          >
            From yacht agency support to private island adventures — everything
            you need for Myanmar's waters.
          </motion.p>
          <motion.a
            custom={0.46} variants={seq}
            href="/contact"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-[14px] md:text-[15px] font-semibold text-black hover:bg-white/90 transition-colors"
          >
            Plan Your Trip
          </motion.a>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          BEYOND OUR SERVICES — MAIN SECTION
      ══════════════════════════════════════ */}
      <section className="mt-[80px] md:mt-[100px] px-3 md:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">

          {/* Section header */}
          <motion.div
            className="flex items-end justify-between gap-4 mb-8 md:mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={stagger(0.1, 0)}
          >
            <div>
              <motion.p
                className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-400"
                variants={fadeUp}
              >
                Beyond Our Services
              </motion.p>
              <motion.h2
                className="mt-2 text-[30px] md:text-[38px] lg:text-[46px] font-[600] leading-tight text-slate-900"
                variants={fadeUp}
              >
                Curated island experiences.
              </motion.h2>
            </div>
            <motion.a
              href="/contact"
              className="shrink-0 hidden sm:inline-flex items-center gap-1.5 text-[14px] font-semibold text-slate-600 hover:text-black transition-colors group"
              variants={fadeUp}
            >
              Enquire
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </motion.a>
          </motion.div>

          {/* ── Mobile / Tablet — stacked cards ── */}
          <div className="lg:hidden space-y-4 md:space-y-5">
            {packages.map((pkg, idx) => (
              <motion.div
                key={pkg.title}
                className="group relative overflow-hidden rounded-3xl cursor-pointer h-[400px] md:h-[480px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
                variants={fadeUp}
              >
                <img
                  src={pkg.img} alt={pkg.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
                <div className={[
                  'absolute inset-0',
                  idx % 2 === 0
                    ? 'bg-gradient-to-r from-black/70 via-black/30 to-transparent'
                    : 'bg-gradient-to-l from-black/70 via-black/30 to-transparent',
                ].join(' ')} />
                <div className={[
                  'absolute inset-y-0 flex flex-col justify-center px-6 md:px-10 max-w-[520px]',
                  idx % 2 === 0 ? 'left-0' : 'right-0',
                ].join(' ')}>
                  <div className="mb-4">{pkg.badge}</div>
                  <h3 className="text-[26px] md:text-[32px] font-[650] leading-snug text-white whitespace-pre-line">{pkg.title}</h3>
                  <p className="mt-3 text-[13px] md:text-[15px] leading-relaxed text-white/65 max-w-[38ch]">{pkg.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4">
                    {pkg.highlights.map((h) => (
                      <span key={h} className="flex items-center gap-1.5 text-[12px] md:text-[13px] text-white/70">
                        <span className="h-[3px] w-[3px] rounded-full bg-white/50 shrink-0" />{h}
                      </span>
                    ))}
                  </div>
                  <a href="/contact" className="mt-6 w-fit inline-flex h-10 items-center justify-center rounded-full bg-white px-6 text-[13px] font-semibold text-black hover:bg-white/90 transition-colors">
                    Enquire Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Laptop — horizontal accordion ── */}
          <motion.div
            className="hidden lg:flex gap-3 h-[600px] xl:h-[660px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger(0.06, 0.1)}
            onHoverStart={() => setPaused(true)}
            onHoverEnd={() => setPaused(false)}
          >
            {packages.map((pkg, idx) => {
              const isActive = activeIdx === idx
              return (
                <motion.div
                  key={pkg.title}
                  className="relative overflow-hidden rounded-2xl cursor-pointer"
                  animate={{ flex: isActive ? 4 : 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onHoverStart={() => setActiveIdx(idx)}
                  variants={fadeUp}
                >
                  {/* Auto-play progress bar */}
                  {isActive && !paused && (
                    <motion.div
                      key={activeIdx}
                      className="absolute bottom-0 left-0 h-[3px] bg-white/60 z-20 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5, ease: 'linear' }}
                    />
                  )}
                  {/* Image */}
                  <motion.img
                    src={pkg.img} alt={pkg.title}
                    className="absolute inset-0 w-full h-full object-cover will-change-transform"
                    animate={{ scale: isActive ? 1.04 : 1.0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Base dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                  {/* Active: stronger left-side gradient for readability */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* ── Collapsed state ── */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-between p-5"
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="text-[12px] tabular-nums font-semibold text-white/40">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {/* Vertical label */}
                    <div
                      className="text-[13px] font-semibold text-white/70 tracking-widest uppercase leading-none"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      {pkg.title.replace('\n', ' ')}
                    </div>
                  </motion.div>

                  {/* ── Expanded state ── */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 flex flex-col justify-end p-8 xl:p-10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, delay: 0.15 }}
                      >
                        {/* Decorative large number */}
                        <span className="absolute top-4 right-5 text-[130px] xl:text-[160px] font-[900] leading-none select-none text-white/[0.05]">
                          {String(idx + 1).padStart(2, '0')}
                        </span>

                        <div className="mb-4">{pkg.badge}</div>

                        <h3 className="text-[28px] xl:text-[34px] font-[650] leading-snug text-white whitespace-pre-line max-w-[16ch]">
                          {pkg.title}
                        </h3>

                        <p className="mt-3 text-[14px] leading-relaxed text-white/65 max-w-[34ch]">
                          {pkg.desc}
                        </p>

                        <div className="mt-4 flex flex-col gap-1.5">
                          {pkg.highlights.map((h) => (
                            <span key={h} className="flex items-center gap-2 text-[12px] xl:text-[13px] text-white/60">
                              <span className="h-[3px] w-[3px] rounded-full bg-white/40 shrink-0" />{h}
                            </span>
                          ))}
                        </div>

                        <a
                          href="/contact"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-6 w-fit inline-flex h-10 items-center justify-center rounded-full bg-white px-6 text-[13px] font-semibold text-black hover:bg-white/90 transition-colors"
                        >
                          Enquire Now
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Core Yacht Agency Services ── */}
      <section className="mt-[80px] md:mt-[100px] px-3 md:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger(0.1, 0)}
          >
            <motion.p
              className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-400"
              variants={fadeUp}
            >
              Yacht Agency Services
            </motion.p>
            <motion.div
              className="mt-3 lg:flex lg:items-end lg:justify-between lg:gap-16"
              variants={fadeUp}
            >
              <h2 className="text-[30px] md:text-[38px] lg:text-[44px] font-[600] leading-tight text-slate-900 max-w-[22ch]">
                Complete support for every yacht visiting Myanmar.
              </h2>
              <p className="mt-4 lg:mt-0 text-[15px] md:text-[16px] text-slate-500 max-w-[38ch] lg:text-right shrink-0">
                We handle the complexity so your crew can focus on the sea.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-10 border-t border-black/10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={stagger(0.07, 0.05)}
          >
            {coreServices.map((s) => (
              <motion.div
                key={s.n}
                className="group flex items-center justify-between border-b border-black/10 py-5 md:py-6"
                variants={fadeUp}
              >
                <div className="flex items-baseline gap-5 md:gap-8">
                  <span className="text-[12px] tabular-nums text-slate-300 w-6 shrink-0">{s.n}</span>
                  <span className="text-[16px] md:text-[18px] lg:text-[20px] font-[450] text-slate-800 group-hover:text-black transition-colors duration-200">
                    {s.title}
                  </span>
                </div>
                <span className="shrink-0 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-slate-400 text-[20px]">
                  →
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Tides ── */}
      <motion.section
        className="mt-[80px] md:mt-[100px] px-3 md:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="mx-auto max-w-screen-xl">
          <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] p-8 md:p-10 lg:p-12 md:flex md:gap-16 lg:gap-24 md:items-center">
            <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

            <div className="md:flex-1">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40 font-semibold">
                Navigation Notes
              </p>
              <h2 className="mt-3 text-[24px] md:text-[30px] lg:text-[34px] font-[600] leading-snug text-white max-w-[24ch]">
                Tidal awareness is essential in the Mergui Archipelago.
              </h2>
              <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed text-white/60 max-w-[52ch]">
                The tidal range in Myanmar is larger than in Phuket. Kawthaung entry port sees a range of
                3 m, while the broader Archipelago reaches 5 m. The region offers plenty of natural
                harbours providing a fantastic range of day and overnight anchorages for cruising yachts.
              </p>
            </div>

            <div className="mt-8 md:mt-0 flex gap-4 md:flex-col md:gap-4 md:shrink-0 md:min-w-[160px]">
              <TideStatCard value={3} max={5} label="Kawthaung Port"    delay={0.2} />
              <TideStatCard value={5} max={5} label="Mergui Archipelago" delay={0.4} />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── CTA Banner ── */}
      <section className="mt-[60px] md:mt-[80px] px-3 md:px-6 lg:px-8 mb-[80px] md:mb-[100px]">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            ref={ctaRef}
            className="relative overflow-hidden rounded-2xl min-h-[200px] md:min-h-[220px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            {/* Parallax image */}
            <motion.div
              className="absolute inset-x-0 will-change-transform"
              style={{ y: ctaImgY, top: -70, bottom: -70 }}
            >
              <img
                src="https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983755/viber_image_2026-03-19_09-18-42-184_qn1xcy.jpg"
                alt="Contact Burma Sailing"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/62" />
            {/* Content */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 px-8 md:px-12 lg:px-14 py-10 md:py-12">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/50 font-semibold">Get Started</p>
                <h2 className="mt-2 text-[22px] md:text-[26px] lg:text-[30px] font-[600] text-white leading-snug max-w-[32ch]">
                  Not sure which service fits your voyage? We'll help you plan.
                </h2>
              </div>
              <a
                href="/contact"
                className="shrink-0 inline-flex h-11 md:h-12 items-center gap-2 rounded-full bg-white px-7 md:px-8 text-[14px] md:text-[15px] font-semibold text-black hover:bg-white/90 transition-colors"
              >
                Contact Us →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
