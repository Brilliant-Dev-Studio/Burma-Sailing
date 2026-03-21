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

/** Ocean / sky tones — cycles for 6 cards */
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
    quote:
      'Burma Sailing handled our cruising permit and port clearance from start to finish—we cleared Kawthaung smoothly and had clear guidance for every leg in the Archipelago.',
    name: 'J. R.',
    role: 'Cruising yacht owner',
    region: 'Australia',
    rating: 5 as const,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces',
  },
  {
    quote:
      'The local knowledge goes beyond any pilot guide: anchorages, tides, and how to move respectfully among the islands. We felt supported the whole passage.',
    name: 'S. & L.',
    role: 'Sailing couple',
    region: 'United Kingdom',
    rating: 5 as const,
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&h=160&fit=crop&crop=faces',
  },
  {
    quote:
      'Fast replies on WhatsApp, transparent paperwork, and a team that genuinely cares that your voyage is legal and safe. Highly recommend for Mergui.',
    name: 'M. K.',
    role: 'Charter guest',
    region: 'Singapore',
    rating: 5 as const,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces',
  },
  {
    quote:
      'We arrived with a tight weather window; they coordinated officials and fuel without drama. That kind of calm efficiency is exactly what you want in a remote port.',
    name: 'P. T.',
    role: 'Sailing yacht captain',
    region: 'Germany',
    rating: 5 as const,
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=faces',
  },
  {
    quote:
      'Paperwork for crew and vessel was explained clearly, and the briefing on restricted zones was thorough. We felt prepared before we weighed anchor.',
    name: 'E. V.',
    role: 'First mate',
    region: 'France',
    rating: 5 as const,
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&crop=faces',
  },
  {
    quote:
      'From Ranong logistics to our first night in a quiet bay—Burma Sailing stayed in touch the whole way. Genuine hospitality and professional service.',
    name: 'H. C.',
    role: 'Charter guest',
    region: 'Hong Kong',
    rating: 5 as const,
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&h=160&fit=crop&crop=faces',
  },
] as const

type Testimonial = (typeof testimonials)[number]

/** ~1 card + peek on small screens, ~2 on md, ~3 on lg */
const CARD_SHELL =
  'shrink-0 w-[min(88vw,300px)] md:w-[min(340px,calc((100vw-5rem)/2.12))] lg:w-[min(384px,calc((100vw-6rem)/3.08))]'

function StarRow({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={
            i < rating
              ? 'h-4 w-4 text-amber-500'
              : 'h-4 w-4 text-slate-200'
          }
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

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
  eagerImage,
}: {
  t: Testimonial
  dataIdx: number
  svgIdSuffix: string
  reducedMotion: boolean
  eagerImage?: boolean
}) {
  return (
    <article className="relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:min-h-[300px]">
      <CardMiddleWaves
        cardIndex={dataIdx}
        svgIdSuffix={svgIdSuffix}
        reducedMotion={reducedMotion}
      />
      <div className="relative z-10 flex min-h-full flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <img
            src={t.avatar}
            alt=""
            width={56}
            height={56}
            className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white shadow-md md:h-14 md:w-14"
            loading={eagerImage ? 'eager' : 'lazy'}
            decoding="async"
          />
          <StarRow rating={t.rating} />
        </div>
        <p
          className="font-serif mt-3 text-[2.75rem] leading-none text-slate-200 select-none md:mt-4 md:text-[3.25rem]"
          aria-hidden
        >
          “
        </p>
        <blockquote className="-mt-1 flex-1 text-[14px] leading-[1.65] text-slate-700 md:text-[15px]">
          {t.quote}
        </blockquote>
        <footer className="mt-6 border-t border-slate-100 pt-4 md:mt-7 md:pt-5">
          <p className="text-[14px] font-medium text-slate-900">{t.name}</p>
          <p className="mt-1 text-[12px] text-slate-500 md:text-[13px]">
            {t.role}
            <span className="text-slate-300"> · </span>
            {t.region}
          </p>
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
      className="relative mt-[100px] md:mt-[120px] border-t border-slate-200/90 bg-white"
      aria-labelledby="home-testimonials-heading"
    >
      <div className="mx-auto max-w-screen-xl px-3 md:px-6 lg:px-8 py-14 md:py-16 lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
          variants={stagger(0.1, 0)}
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            From our guests
          </motion.p>
          <motion.h2
            id="home-testimonials-heading"
            variants={fadeUp}
            className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.75rem] md:leading-snug"
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
                    eagerImage={i < 3}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="testimonial-marquee-clip testimonial-marquee-wrap -mx-1 overflow-hidden px-1 md:-mx-2 md:px-2">
              <div className="testimonial-marquee-track flex gap-5 md:gap-6">
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
                        eagerImage={loopIdx < 3}
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
