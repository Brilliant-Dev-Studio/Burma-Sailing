import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, useScroll, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const
const dur  = 0.5

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: dur, ease } },
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

const approachItems = [
  'Respecting local cultures and traditional island communities',
  'Encouraging environmental awareness among visiting yachts',
  'Providing honest, transparent, and dependable services',
  'Ensuring every journey is safe, legal, and well-prepared',
]

const seasons = [
  {
    name: 'Cool Season',
    months: 'Nov — Feb',
    temp: '20 – 24 °C',
    note: 'Best cruising season. Dry NE monsoon. Calm, clear waters.',
    best: true,
    cardBg: 'bg-[#061e35]',
    glow: 'from-sky-500/20 via-transparent to-transparent',
    monthColor: 'text-sky-400/60',
    nameColor: 'text-white',
    tempColor: 'text-sky-300/80',
    noteColor: 'text-white/55',
    divider: 'bg-white/10',
    badgeBg: 'bg-sky-400/20 text-sky-200',
    dot: 'bg-sky-400',
  },
  {
    name: 'Hot Season',
    months: 'Mar — May',
    temp: '30 – 35 °C',
    note: 'Still good sailing. Rising temperatures toward May.',
    best: false,
    cardBg: 'bg-[#fdf6e8]',
    glow: 'from-amber-400/15 via-transparent to-transparent',
    monthColor: 'text-amber-600/70',
    nameColor: 'text-slate-900',
    tempColor: 'text-amber-500',
    noteColor: 'text-slate-500',
    divider: 'bg-amber-200/60',
    badgeBg: '',
    dot: 'bg-amber-400',
  },
  {
    name: 'Rainy Season',
    months: 'Jun — Oct',
    temp: '25 – 30 °C',
    note: 'SW monsoon. Not recommended for cruising.',
    best: false,
    cardBg: 'bg-[#e8edf4]',
    glow: 'from-slate-400/15 via-transparent to-transparent',
    monthColor: 'text-slate-500/80',
    nameColor: 'text-slate-800',
    tempColor: 'text-slate-500',
    noteColor: 'text-slate-500',
    divider: 'bg-slate-300/60',
    badgeBg: '',
    dot: 'bg-slate-400',
  },
]

export default function Destinations() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  const ctaRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  })
  const ctaImgY = useTransform(ctaScroll, [0, 1], [-50, 50])

  return (
    <motion.div
      variants={pageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
    >
      <Helmet>
        <title>Burma Sailing | Destinations</title>
        <meta name="description" content="Discover the Mergui Archipelago — 800+ islands across 10,000 sq miles of pristine waters in southern Myanmar. Explore sailing routes, anchorages, and seasonal guides." />
        <meta name="keywords" content="Mergui Archipelago destinations, Myanmar sailing islands, Kawthaung sailing, remote anchorages Myanmar" />
        <meta property="og:title" content="Burma Sailing | Destinations" />
        <meta property="og:description" content="Explore 800+ islands in the Mergui Archipelago — one of Southeast Asia's last untouched cruising grounds." />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* ── Hero (parallax) ── */}
      <div
        ref={heroRef}
        className="relative h-[84svh] overflow-hidden rounded-b-[4px]"
      >
        <motion.img
          src="/IMG_2671.JPG"
          alt="Mergui Archipelago"
          style={{ y: heroImgY }}
          className="w-full h-[120%] object-cover object-center will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/65" />
        <motion.div
          className="absolute bottom-[50px] left-[4%] md:left-[6%] lg:left-[8%] text-white max-w-[90%] md:max-w-[60%] lg:max-w-[50%]"
          initial="hidden"
          animate="visible"
          variants={stagger(0.13, 0.1)}
        >
          <motion.p className="text-sm mb-3 tracking-wide" variants={fadeUp}>
            Burma Sailing
          </motion.p>
          <motion.h1
            className="text-[32px] md:text-[48px] lg:text-[58px] xl:text-[68px] font-[600] leading-tight"
            variants={fadeUp}
          >
            Mergui Archipelago
          </motion.h1>
          <motion.p
            className="mt-3 text-white/75 text-[15px] md:text-[16px] max-w-[38ch]"
            variants={fadeUp}
          >
            800+ islands across 10,000 sq miles of pristine, largely untouched
            waters in southern Myanmar.
          </motion.p>
          <motion.a
            href="/contact"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-[14px] md:text-[15px] font-semibold text-black hover:bg-white/90 transition-colors"
            variants={fadeUp}
          >
            Plan Your Voyage
          </motion.a>
        </motion.div>
      </div>

      {/* ── Our Destination ── */}
      <section className="mt-[80px] md:mt-[100px] px-3 md:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            className="lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger(0.1, 0)}
          >
            <motion.div variants={fadeUp}>
              <p className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-400">
                Our Destination
              </p>
              <h2 className="mt-3 text-[30px] md:text-[38px] lg:text-[44px] font-[600] leading-tight text-slate-900">
                Lying 180 km north of Phuket — closed to the world for over fifty years.
              </h2>
            </motion.div>
            <motion.p
              className="mt-5 lg:mt-0 text-[15px] md:text-[16px] leading-relaxed text-slate-600"
              variants={fadeUp}
            >
              Comprising over eight hundred islands and covering an area of ten thousand square miles,
              the Mergui Archipelago in southern Myanmar had, until January 1997, been closed to all
              foreigners for over fifty years. This extraordinary area is totally untouched by modern
              development — the majority of islands are densely forested and mountainous, with
              impenetrable jungle meeting white sand beaches.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Wildlife & Nature ── */}
      <section className="mt-[70px] md:mt-[90px] px-3 md:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            className="grid gap-6 md:gap-8 md:grid-cols-2 lg:gap-14 lg:items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger(0.12, 0)}
          >
            <motion.div
              className="overflow-hidden rounded-2xl h-[320px] md:h-[420px] lg:h-[500px]"
              variants={fadeUp}
            >
              <img
                src="/IMG_2672.JPG"
                alt="Mergui islands"
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
            </motion.div>

            <motion.div className="flex flex-col justify-center" variants={fadeUp}>
              <p className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-400">
                Wildlife & Nature
              </p>
              <h3 className="mt-3 text-[26px] md:text-[32px] lg:text-[36px] font-[600] leading-snug text-slate-900">
                Alive with extraordinary diversity.
              </h3>
              <p className="mt-4 text-[15px] md:text-[16px] leading-relaxed text-slate-600">
                Due to the Archipelago's virtual isolation, the islands and surrounding seas teem with
                an amazing diversity of wildlife, flora, and fauna. Parrots, hornbills, sea eagles, and
                herons fill the skies, whilst on land the animal population includes wild cattle,
                monkeys, deer, wild pigs, tigers, fruit bats, and fishing cats.
              </p>
              <p className="mt-4 text-[15px] md:text-[16px] leading-relaxed text-slate-600">
                The only human inhabitants in the area are the Sea Gypsies — a nomadic seafaring race
                whose lifestyle has changed very little over centuries, still practising the same
                fishing and boat-building techniques used for generations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Sail With Us ── */}
      <section className="mt-[80px] md:mt-[100px] px-3 md:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            className="lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger(0.1, 0)}
          >
            <motion.div variants={fadeUp}>
              <p className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-400">
                Why Sail With Us
              </p>
              <h2 className="mt-3 text-[30px] md:text-[38px] lg:text-[44px] font-[600] leading-tight text-slate-900">
                Local Knowledge. Professional Support. Authentic Access.
              </h2>
            </motion.div>
            <motion.p
              className="mt-5 lg:mt-0 text-[15px] md:text-[16px] leading-relaxed text-slate-600"
              variants={fadeUp}
            >
              Sailing in this region is not like cruising in mainstream destinations. It requires
              trusted local expertise, careful coordination, and an understanding of both the sea and
              the system ashore. We don't just arrange entry — we help open the door to a rare sailing
              experience that few places in the world can still offer.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Our Approach ── */}
      <section className="mt-[80px] md:mt-[100px] px-3 md:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger(0.08, 0)}
          >
            <motion.p
              className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-400"
              variants={fadeUp}
            >
              Our Approach
            </motion.p>
            <motion.div
              className="mt-3 lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:items-end"
              variants={fadeUp}
            >
              <h2 className="text-[30px] md:text-[38px] lg:text-[44px] font-[600] leading-tight text-slate-900">
                Access managed with care and responsibility.
              </h2>
              <p className="mt-4 lg:mt-0 text-[15px] md:text-[16px] leading-relaxed text-slate-600">
                The Mergui Archipelago remains one of the last largely untouched marine environments in
                the world. We believe access to such a destination must be managed with care.
                Burma Sailing is committed to:
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-8 border-t border-black/10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger(0.08, 0.05)}
          >
            {approachItems.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-6 md:gap-10 border-b border-black/10 py-5 md:py-6"
                variants={fadeUp}
              >
                <span className="shrink-0 mt-1 text-[12px] tabular-nums text-slate-300 w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[16px] md:text-[18px] font-[450] text-slate-800 leading-snug">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Weather / Seasons ── */}
      <section className="mt-[80px] md:mt-[100px] px-3 md:px-6 lg:px-8 pb-[80px]">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            className="lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:items-end mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger(0.1, 0)}
          >
            <motion.div variants={fadeUp}>
              <p className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-400">
                Weather
              </p>
              <h2 className="mt-3 text-[30px] md:text-[38px] lg:text-[44px] font-[600] leading-tight text-slate-900">
                Three seasons, one perfect window.
              </h2>
            </motion.div>
            <motion.p
              className="mt-4 lg:mt-0 text-[15px] md:text-[16px] leading-relaxed text-slate-600"
              variants={fadeUp}
            >
              Southern Myanmar's seasons are similar to Phuket. The best season for cruising the
              Mergui Archipelago runs from{' '}
              <span className="font-semibold text-slate-800">mid-October to mid-May</span>.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger(0.1, 0.05)}
          >
            {seasons.map((s) => (
              <motion.div
                key={s.name}
                className={[
                  'relative rounded-2xl p-6 md:p-7 overflow-hidden cursor-default',
                  s.cardBg,
                ].join(' ')}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  boxShadow: s.best
                    ? '0 20px 48px rgba(6,30,53,0.5)'
                    : '0 20px 48px rgba(0,0,0,0.10)',
                  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                {/* Color glow gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.glow} pointer-events-none`} />

                {/* Season indicator dot */}
                <span className={`absolute top-5 right-5 h-2 w-2 rounded-full ${s.dot}`} />

                {s.best && (
                  <span className={`absolute top-4 right-9 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${s.badgeBg}`}>
                    Best
                  </span>
                )}

                <p className={`text-[11px] uppercase tracking-[0.18em] font-semibold ${s.monthColor}`}>
                  {s.months}
                </p>
                <h3 className={`mt-2 text-[20px] md:text-[22px] font-[600] ${s.nameColor}`}>
                  {s.name}
                </h3>
                <motion.p
                  className={`mt-1 text-[28px] md:text-[30px] font-[300] tabular-nums ${s.tempColor}`}
                  whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                >
                  {s.temp}
                </motion.p>
                <div className={`mt-5 h-px w-full ${s.divider}`} />
                <p className={`mt-4 text-[14px] md:text-[15px] leading-relaxed ${s.noteColor}`}>
                  {s.note}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA strip */}
          <motion.div
            ref={ctaRef}
            className="mt-8 md:mt-10 rounded-2xl overflow-hidden relative min-h-[180px] md:min-h-[200px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
          >
            <motion.div
              className="absolute inset-x-0 will-change-transform"
              style={{ y: ctaImgY, top: -70, bottom: -70 }}
            >
              <img
                src="/IMG_2668.JPG"
                alt="Sailing the Mergui Archipelago"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 px-7 md:px-10 lg:px-12 py-8 md:py-10">
              <div>
                <p className="text-white text-[20px] md:text-[24px] lg:text-[28px] font-[600] leading-snug max-w-[30ch]">
                  Ready to explore Myanmar's hidden islands?
                </p>
                <p className="text-white/60 text-[14px] md:text-[15px] mt-1.5">
                  We'll handle everything from permits to passage.
                </p>
              </div>
              <a
                href="/contact"
                className="shrink-0 inline-flex h-11 md:h-12 items-center justify-center rounded-full bg-white px-8 text-[14px] md:text-[15px] font-semibold text-black hover:bg-white/90 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Gallery CTA ── */}
      <section className="px-3 md:px-6 lg:px-8 pb-[80px] md:pb-[100px]">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger(0.1, 0)}
          >
            <motion.div
              className="flex items-end justify-between gap-4 mb-5 md:mb-7"
              variants={fadeUp}
            >
              <div>
                <p className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-400">
                  Gallery
                </p>
                <h2 className="mt-2 text-[28px] md:text-[36px] lg:text-[42px] font-[600] leading-tight text-slate-900">
                  See it for yourself.
                </h2>
              </div>
              <a
                href="/gallery"
                className="shrink-0 inline-flex items-center gap-1.5 text-[14px] font-semibold text-slate-700 hover:text-black transition-colors group"
              >
                View all photos
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            </motion.div>

            {/* Image grid */}
            <motion.div
              className="grid grid-cols-2 gap-2 md:grid-cols-4 md:grid-rows-2"
              variants={stagger(0.08, 0.05)}
            >
              {/* Large featured tile */}
              <motion.a
                href="/gallery"
                className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl group h-[300px] md:h-[380px] lg:h-[440px]"
                variants={fadeUp}
              >
                <img
                  src="/IMG_2675.JPG"
                  alt="Mergui Archipelago"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="absolute bottom-4 left-4 text-white text-[14px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Sailing Life</p>
              </motion.a>

              {/* Top-right */}
              <motion.a
                href="/gallery"
                className="col-span-1 relative overflow-hidden rounded-2xl group h-[145px] md:h-[186px] lg:h-[216px]"
                variants={fadeUp}
              >
                <img
                  src="/IMG_2670.JPG"
                  alt="Island Light"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>

              {/* Top-right 2 */}
              <motion.a
                href="/gallery"
                className="col-span-1 relative overflow-hidden rounded-2xl group h-[145px] md:h-[186px] lg:h-[216px]"
                variants={fadeUp}
              >
                <img
                  src="/IMG_2674.JPG"
                  alt="Remote Passage"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>

              {/* Bottom-right wide */}
              <motion.a
                href="/gallery"
                className="col-span-2 relative overflow-hidden rounded-2xl group h-[145px] md:h-[186px] lg:h-[216px]"
                variants={fadeUp}
              >
                <img
                  src="/IMG_2669.JPG"
                  alt="Deck Moments"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-[13px] font-semibold text-black">
                    Open Gallery ↗
                  </span>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
