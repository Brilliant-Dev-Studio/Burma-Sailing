import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const stagger = (gap: number, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
})

/** Ocean / sky tones — cycles per card */
const WAVE_PALETTES = [
  { c1: '#2dd4bf', c2: '#0ea5e9', stroke: '#0d9488' },
  { c1: '#7dd3fc', c2: '#818cf8', stroke: '#4f46e5' },
  { c1: '#fcd34d', c2: '#fb923c', stroke: '#ea580c' },
  { c1: '#86efac', c2: '#34d399', stroke: '#059669' },
  { c1: '#fda4af', c2: '#f472b6', stroke: '#db2777' },
  { c1: '#c4b5fd', c2: '#a78bfa', stroke: '#7c3aed' },
] as const

const testimonials = [
  {
    quote: `We had a great experience working with your agency during our trip.

The support and coordination were excellent, and everything was handled smoothly from start to finish.

We especially appreciated the detailed information and guidance you provided regarding the diving spots. The recommendations were accurate, well-planned, and helped us maximize our time on the water.

It made the trip more enjoyable and efficient for both crew and guests.

Your communication was always prompt and professional, and it was clear that you truly understand the needs of captains and yacht operations.

I highly recommend your services to other captains and yachts looking for reliable and knowledgeable local support.`,
    name: 'Melvin',
    role: 'GOTO Captain',
  },
  {
    quote: `We did the archipelago tour organized by Burma Sailing. Probably the only opportunity to sail around untouched islands of Burma. We met Moken people still living their original sea gypsy life. Most of the islands are inhabited, beautiful mooring spots.

We had a guide on board for the trip.

Perfect organization by Nai.Nai

Not cheap, but worth it.`,
    name: 'Astra',
    role: '',
  },
  {
    quote: `I've known Nai Nai for over ten years, first through Burma Boating and now with Burma Sailing. As a superyacht captain, I've used his services plenty—he handles immigration, customs, and park permits for the Mergui Archipelago like clockwork. Always prompt, always smiling, super knowledgeable about the islands, birds, wildlife… honestly, he's just a lovely, easygoing bloke who makes everything smooth. You won't regret booking with him—I've never had a single hiccup.`,
    name: 'Bruce John',
    role: 'Superyacht captain',
  },
] as const

type Testimonial = (typeof testimonials)[number]

/** ~1 card + peek on small screens, ~2 on md, ~3 on lg */
const CARD_SHELL =
  'shrink-0 w-[min(90vw,340px)] md:w-[min(360px,calc((100vw-5rem)/2.12))] lg:w-[min(400px,calc((100vw-6rem)/3.08))]'

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

function CardMiddleWaves({
  cardIndex,
  svgIdSuffix,
  reducedMotion,
}: {
  cardIndex: number
  svgIdSuffix: string
  reducedMotion: boolean
}) {
  const palette = WAVE_PALETTES[cardIndex % WAVE_PALETTES.length]
  const gid = `tw-${svgIdSuffix}`
  const waveAnim = ['testimonial-wave-a', 'testimonial-wave-b', 'testimonial-wave-c'][
    cardIndex % 3
  ]

  const o = cardIndex * 11
  const paths: { d: string; opacity: number }[] = [
    {
      d: `M-40,52 Q${60 + o},36 ${160 + o},52 T${360 + o},52 T${560 + o},52 L560,120 L-40,120 Z`,
      opacity: 0.2,
    },
    {
      d: `M-40,62 Q${80 + o},78 ${200 + o},58 T${400 + o},66 T${600 + o},58 L600,120 L-40,120 Z`,
      opacity: 0.14,
    },
    {
      d: `M-40,44 Q${100 + o},58 ${220 + o},42 T${440 + o},48 T${660 + o},44 L660,120 L-40,120 Z`,
      opacity: 0.1,
    },
  ]

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-[24%] bottom-[24%] overflow-hidden"
      aria-hidden
    >
      <div
        className={
          reducedMotion ? 'absolute inset-0' : `absolute inset-0 ${waveAnim}`
        }
      >
        <svg
          className="absolute inset-0 h-full w-[135%] max-w-none -left-[17%]"
          viewBox="0 0 520 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`${gid}-fade`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.c1} stopOpacity="0" />
              <stop offset="20%" stopColor={palette.c1} stopOpacity="0.5" />
              <stop offset="48%" stopColor={palette.c2} stopOpacity="0.65" />
              <stop offset="78%" stopColor={palette.c2} stopOpacity="0.45" />
              <stop offset="100%" stopColor={palette.c1} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${gid}-line`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={palette.c1} stopOpacity="0.35" />
              <stop offset="50%" stopColor={palette.stroke} stopOpacity="0.55" />
              <stop offset="100%" stopColor={palette.c2} stopOpacity="0.35" />
            </linearGradient>
          </defs>
          {paths.map((p, i) => (
            <path
              key={i}
              d={p.d}
              fill={`url(#${gid}-fade)`}
              fillOpacity={p.opacity}
            />
          ))}
          <path
            d={`M-20,50 Q${90 + o},38 ${210 + o},50 T${430 + o},46 T${640 + o},50`}
            fill="none"
            stroke={`url(#${gid}-line)`}
            strokeOpacity={0.85}
            strokeWidth={0.75}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M-20,68 Q${110 + o},82 ${250 + o},64 T${470 + o},72 T${680 + o},66`}
            fill="none"
            stroke={palette.stroke}
            strokeOpacity={0.22}
            strokeWidth={0.6}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  )
}

function TestimonialCard({
  t,
  dataIdx,
  svgIdSuffix,
  reducedMotion,
}: {
  t: Testimonial
  dataIdx: number
  svgIdSuffix: string
  reducedMotion: boolean
}) {
  const palette = WAVE_PALETTES[dataIdx % WAVE_PALETTES.length]

  return (
    <article
      className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-white to-slate-50/90 shadow-[0_12px_40px_-14px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.04] transition-[box-shadow,transform] duration-300 hover:shadow-[0_20px_50px_-12px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 md:min-h-[300px]"
    >
      <CardMiddleWaves
        cardIndex={dataIdx}
        svgIdSuffix={svgIdSuffix}
        reducedMotion={reducedMotion}
      />
      {/* Soft vignette so wave + text stay readable */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] rounded-3xl bg-gradient-to-b from-white/30 via-transparent to-slate-50/40"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-full flex-col p-6 md:p-7">
        <p
          className="font-serif text-[3rem] leading-[0.85] text-teal-600/[0.22] select-none md:text-[3.35rem]"
          style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}
          aria-hidden
        >
          “
        </p>
        <blockquote className="-mt-1 flex-1 whitespace-pre-line font-serif text-[14px] leading-[1.75] text-slate-600 antialiased md:text-[15px] md:leading-[1.8]">
          {t.quote}
        </blockquote>
        <footer className="mt-6 border-t border-slate-200/80 pt-5 md:mt-7 md:pt-6">
          <div
            className="mb-3 h-0.5 w-11 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${palette.c1}, ${palette.c2})`,
            }}
            aria-hidden
          />
          <p className="text-[15px] font-semibold tracking-tight text-slate-900">{t.name}</p>
          {t.role ? (
            <p className="mt-1.5 text-[13px] leading-snug text-slate-500">{t.role}</p>
          ) : null}
        </footer>
      </div>
    </article>
  )
}

export default function HomeTestimonialsSection() {
  const reducedMotion = usePrefersReducedMotion()
  const loop: Testimonial[] = [...testimonials, ...testimonials]

  return (
    <section
      className="relative mt-[100px] md:mt-[120px] overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-slate-50/95 via-white to-slate-50/70"
      aria-labelledby="home-testimonials-heading"
    >
      {/* Subtle header rule */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/25 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-sky-200/25 blur-3xl md:-right-16" aria-hidden />
      <div className="pointer-events-none absolute -left-20 bottom-32 h-64 w-64 rounded-full bg-teal-200/20 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-screen-xl px-3 md:px-6 lg:px-8 py-14 md:py-16 lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
          variants={stagger(0.1, 0)}
          className="max-w-2xl"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span
              className="inline-flex h-px w-8 bg-gradient-to-r from-teal-500/60 to-sky-500/50"
              aria-hidden
            />
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              From our guests
            </p>
          </motion.div>
          <motion.h2
            id="home-testimonials-heading"
            variants={fadeUp}
            className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.85rem] md:leading-snug"
          >
            Notes from the passage
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600"
          >
            Short reflections from people who have cleared in at Kawthaung and
            sailed the Archipelago with our support.
          </motion.p>
        </motion.div>

        <div
          className="relative mt-10 md:mt-12"
          role="region"
          aria-label="Guest testimonials, scrolling"
        >
          {reducedMotion ? (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <li key={`static-${t.name}-${i}`}>
                  <TestimonialCard
                    t={t}
                    dataIdx={i}
                    svgIdSuffix={`static-${i}`}
                    reducedMotion
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="testimonial-marquee-clip testimonial-marquee-wrap -mx-1 overflow-hidden px-1 md:-mx-2 md:px-2">
              <div className="testimonial-marquee-track flex gap-6 md:gap-7">
                {loop.map((t, loopIdx) => {
                  const dataIdx = loopIdx % testimonials.length
                  return (
                    <div
                      key={`marquee-${loopIdx}-${t.name}`}
                      className={CARD_SHELL}
                    >
                      <TestimonialCard
                        t={t}
                        dataIdx={dataIdx}
                        svgIdSuffix={`m${loopIdx}`}
                        reducedMotion={false}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
