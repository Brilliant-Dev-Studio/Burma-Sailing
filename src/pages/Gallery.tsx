import { useCallback, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { galleryImages } from '../lib/gallery'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease } },
}

const stagger = (gap: number, delay = 0) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
})

// Map Cloudinary images to the shape Gallery expects
const images = galleryImages.map((img, i) => ({
  src:      img.url,
  caption:  img.caption || `Photo ${i + 1}`,
  category: img.category,
}))

const categories = ['All', 'Sailing', 'Islands', 'Onboard']

/** Returns a 30 px-wide, heavily-blurred Cloudinary URL (loads in <100 ms). */
function cloudinaryBlur(url: string): string | null {
  const base = 'https://res.cloudinary.com/dvbgmlsvl/image/upload/'
  if (!url.startsWith(base)) return null
  const rest = url.slice(base.length).replace(/^v\d+\//, '')
  return `${base}w_30,q_5,e_blur:800/${rest}`
}

const pageMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [loadedSet, setLoadedSet]           = useState<Set<string>>(new Set())
  const [lightbox, setLightbox]             = useState<number | null>(null)
  const thumbsRef                           = useRef<HTMLDivElement>(null)
  const dragStartX                          = useRef(0)
  const heroRef                             = useRef<HTMLDivElement>(null)
  const moreRef                             = useRef<HTMLDivElement>(null)

  // Parallax — hero
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '22%'])

  // Parallax — "More photos" banner
  const { scrollYProgress: moreScroll } = useScroll({
    target: moreRef,
    offset: ['start end', 'end start'],
  })
  const moreImgY = useTransform(moreScroll, [0, 1], [-50, 50])

  const filtered = activeCategory === 'All'
    ? images
    : images.filter((img) => img.category === activeCategory)

  const countFor = (cat: string) =>
    cat === 'All' ? images.length : images.filter((i) => i.category === cat).length

  const pendingRef = useRef<string[]>([])
  const rafRef     = useRef<number | null>(null)

  const markLoaded = useCallback((src: string) => {
    pendingRef.current.push(src)
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      const batch = pendingRef.current.splice(0)
      setLoadedSet((prev) => { const s = new Set(prev); batch.forEach((u) => s.add(u)); return s })
      rafRef.current = null
    })
  }, [])

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const goPrev = useCallback(() => {
    setLightbox((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null))
  }, [filtered.length])

  const goNext = useCallback(() => {
    setLightbox((i) => (i !== null ? (i + 1) % filtered.length : null))
  }, [filtered.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     closeLightbox()
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeLightbox, goPrev, goNext])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  useEffect(() => {
    if (lightbox === null || !thumbsRef.current) return
    const el = thumbsRef.current.children[lightbox] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [lightbox])

  return (
    <motion.div
      variants={pageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
    >
      <Helmet>
        <title>Burma Sailing | Gallery</title>
        <meta name="description" content="Browse photos from Burma Sailing voyages — onboard life, island anchorages, and open waters of the Mergui Archipelago in southern Myanmar." />
        <meta name="keywords" content="Burma Sailing gallery, Mergui Archipelago photos, Myanmar sailing images, sailing photography Myanmar" />
        <meta property="og:title" content="Burma Sailing | Gallery" />
        <meta property="og:description" content="A glimpse of life onboard — interiors, island moments, and the quiet luxury of sailing the Mergui Archipelago." />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* ── Hero Banner ── */}
      <motion.div
        ref={heroRef}
        className="relative h-[52vh] md:h-[62vh] lg:h-[72vh] min-h-[300px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Parallax image — taller than container so it has room to slide */}
        <motion.img
          src="https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983731/viber_image_2026-03-19_09-05-53-362_aqwiiq.jpg"
          alt="Gallery hero"
          style={{ y: heroImgY }}
          className="w-full h-[120%] object-cover object-center will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/65" />
        <div className="absolute bottom-8 md:bottom-12 lg:bottom-16 left-4 md:left-8 lg:left-12 right-4 text-white">
          <motion.p
            className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Burma Sailing
          </motion.p>
          <motion.h1
            className="mt-2 text-[36px] md:text-[52px] lg:text-[64px] font-[600] leading-tight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Moments at sea.
          </motion.h1>
          <motion.p
            className="mt-2 text-white/70 text-[14px] md:text-[16px] max-w-[42ch]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Life aboard, island anchorages, and the extraordinary waters of the Mergui Archipelago.
          </motion.p>
        </div>
      </motion.div>

      {/* ── Title + Description ── */}
      <motion.div
        className="px-3 md:px-6 lg:px-8 pt-10 md:pt-14 pb-8"
        initial="hidden"
        animate="visible"
        variants={stagger(0.1, 0.15)}
      >
        <div className="mx-auto max-w-screen-xl md:grid md:grid-cols-[1fr_1.4fr] md:gap-12 lg:gap-20 md:items-end">
          <motion.div variants={fadeUp}>
            <p className="uppercase text-[12px] font-semibold tracking-[0.18em] text-slate-400">
              Our Gallery
            </p>
            <h2 className="mt-3 text-[30px] md:text-[40px] lg:text-[50px] font-[600] leading-tight text-slate-900">
              Every voyage, captured.
            </h2>
          </motion.div>
          <motion.p
            className="mt-4 md:mt-0 text-[15px] md:text-[16px] leading-relaxed text-slate-500 max-w-[56ch]"
            variants={fadeUp}
          >
            Browse through our collection of moments from the Mergui Archipelago —
            open waters, hidden anchorages, life on deck, and the islands few ever see.
            Use the filters below to explore by theme.
          </motion.p>
        </div>
      </motion.div>

      {/* ── Filter + Counter ── */}
      <motion.div
        className="px-3 md:px-6 lg:px-8 pb-6"
        initial="hidden"
        animate="visible"
        variants={stagger(0.08, 0.1)}
      >
        <div className="mx-auto max-w-screen-xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category pills */}
          <motion.div className="flex gap-2 flex-wrap" variants={fadeUp}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setLightbox(null) }}
                className={[
                  'h-9 rounded-full px-4 text-[13px] font-medium transition-colors duration-200 flex items-center gap-1.5',
                  activeCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-transparent border border-black/15 text-slate-600 hover:border-black/40',
                ].join(' ')}
              >
                {cat}
                <span className={[
                  'text-[11px] tabular-nums',
                  activeCategory === cat ? 'text-white/60' : 'text-slate-400',
                ].join(' ')}>
                  {countFor(cat)}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Photo counter */}
          <motion.p className="text-[13px] text-slate-400 shrink-0" variants={fadeUp}>
            Showing{' '}
            <span className="font-semibold text-slate-700">{filtered.length}</span>{' '}
            photo{filtered.length !== 1 ? 's' : ''}
          </motion.p>
        </div>
      </motion.div>

      {/* ── Masonry Grid ── */}
      <div className="px-3 md:px-6 lg:px-8 pb-16">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            key={activeCategory}
            className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {filtered.map((img, idx) => {
              const loaded  = loadedSet.has(img.src)
              const blurSrc = cloudinaryBlur(img.src)
              return (
                <div
                  key={img.src}
                  className="break-inside-avoid rounded-xl cursor-pointer group relative overflow-hidden"
                  // Only use a guessed aspect-ratio for non-Cloudinary images (no blur available)
                  style={!loaded && !blurSrc ? { aspectRatio: idx % 2 === 0 ? '3/4' : '4/3' } : undefined}
                  onClick={() => setLightbox(idx)}
                >
                  {/*
                    Blur placeholder — same aspect ratio as the real image, loads in <100 ms.
                    It lives in normal flow so it sets the container height correctly.
                    Removed from DOM once the real image is ready (no layout shift because
                    the real image rendered at the same width produces the same height).
                  */}
                  {!loaded && blurSrc && (
                    <img
                      src={blurSrc}
                      alt=""
                      aria-hidden
                      className="w-full block rounded-xl"
                    />
                  )}

                  {/* Shimmer sits on top of the placeholder */}
                  {!loaded && (
                    <div className="absolute inset-0 bg-slate-100/80 animate-pulse rounded-xl" />
                  )}

                  {/* Real image — absolute while loading, moves to normal flow once done */}
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading={idx < 8 ? 'eager' : 'lazy'}
                    onLoad={() => markLoaded(img.src)}
                    className={[
                      'rounded-xl transition-opacity duration-500 group-hover:brightness-90',
                      loaded
                        ? 'w-full block opacity-100'
                        : 'absolute inset-0 w-full h-full object-cover opacity-0',
                    ].join(' ')}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 rounded-b-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <p className="text-white text-[13px] md:text-[14px] font-semibold">{img.caption}</p>
                    <p className="text-white/60 text-[11px] md:text-[12px] mt-0.5">{img.category}</p>
                  </div>

                  {/* Index badge */}
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium rounded-full px-2.5 py-1">
                      {idx + 1}/{filtered.length}
                    </span>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* ── More Photos Coming Soon ── */}
      <div className="px-3 md:px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-screen-xl">
          <motion.section
            ref={moreRef}
            className="rounded-2xl overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            {/* Mobile / Tablet — tall image card */}
            <div className="lg:hidden relative h-[280px] md:h-[340px] overflow-hidden">
              <motion.div
                className="absolute inset-x-0 will-change-transform"
                style={{ y: moreImgY, top: -70, bottom: -70 }}
              >
                <img src="/IMG_2670.JPG" alt="More coming soon" className="w-full h-full object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/50 font-semibold">Always growing</p>
                <h2 className="mt-3 text-[24px] md:text-[28px] font-[600] text-white leading-snug">
                  More photos on the way.
                </h2>
                <p className="mt-3 text-white/60 text-[14px] max-w-[36ch]">
                  We're constantly out on the water. Check back for new images from every voyage.
                </p>
                <a
                  href="/contact"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-[14px] font-semibold text-black hover:bg-white/90 transition-colors"
                >
                  Plan Your Voyage
                </a>
              </div>
            </div>

            {/* Laptop — compact horizontal strip */}
            <div className="hidden lg:flex items-stretch min-h-0 bg-slate-900 rounded-2xl overflow-hidden">
              {/* Left — image thumbnail */}
              <div className="w-[320px] shrink-0 relative overflow-hidden">
                <motion.div
                  className="absolute inset-x-0 will-change-transform"
                  style={{ y: moreImgY, top: -70, bottom: -70 }}
                >
                  <img
                    src="/IMG_2670.JPG"
                    alt="More coming soon"
                    className="w-full h-full object-cover opacity-70"
                  />
                </motion.div>
              </div>
              {/* Right — text + CTA */}
              <div className="flex flex-1 items-center justify-between gap-10 px-12 py-10">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40 font-semibold">
                    Always growing
                  </p>
                  <h2 className="mt-3 text-[28px] xl:text-[34px] font-[600] text-white leading-snug">
                    More photos on the way.
                  </h2>
                  <p className="mt-3 text-white/50 text-[15px] max-w-[42ch] leading-relaxed">
                    We're constantly out on the water. Check back for new images from every voyage.
                  </p>
                </div>
                <a
                  href="/contact"
                  className="shrink-0 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-[14px] font-semibold text-black hover:bg-white/90 transition-colors"
                >
                  Plan Your Voyage
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/94 backdrop-blur-sm" onClick={closeLightbox} />

            {/* Main image — swipeable */}
            <motion.div
              key={lightbox}
              className="relative z-10 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.26, ease }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragStart={(_e, info) => { dragStartX.current = info.point.x }}
              onDragEnd={(_e, info) => {
                const delta = info.point.x - dragStartX.current
                if (delta < -50) goNext()
                else if (delta > 50) goPrev()
              }}
            >
              <div className="w-[min(88vw,640px)] h-[min(62vh,500px)] md:w-[min(80vw,800px)] md:h-[min(68vh,600px)] lg:w-[min(72vw,960px)] lg:h-[min(72vh,680px)] rounded-xl overflow-hidden shadow-2xl bg-black flex items-center justify-center select-none">
                <img
                  src={filtered[lightbox].src}
                  alt={filtered[lightbox].caption}
                  className="w-full h-full object-contain pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="text-white text-[15px] md:text-[16px] font-semibold">{filtered[lightbox].caption}</p>
                <p className="text-white/50 text-[12px] md:text-[13px] mt-1">
                  {filtered[lightbox].category} · {lightbox + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>

            {/* Thumbnail strip */}
            <div
              ref={thumbsRef}
              className="relative z-10 mt-5 flex gap-2 overflow-x-auto max-w-[min(88vw,640px)] md:max-w-[min(80vw,800px)] lg:max-w-[min(72vw,960px)] px-1 pb-1 scrollbar-hide"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {filtered.map((img, i) => (
                <button
                  key={img.src}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i) }}
                  style={{ scrollSnapAlign: 'center' }}
                  className={[
                    'shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200',
                    i === lightbox ? 'border-white scale-[1.08]' : 'border-transparent opacity-50 hover:opacity-80',
                  ].join(' ')}
                >
                  <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              className="absolute left-3 md:left-6 top-[44%] -translate-y-1/2 z-20 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              className="absolute right-3 md:right-6 top-[44%] -translate-y-1/2 z-20 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            {/* Swipe hint */}
            <motion.p
              className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-white/30 text-[12px] hidden md:block"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              use ← → keys to navigate
            </motion.p>
            <motion.p
              className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-white/30 text-[12px] md:hidden"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              swipe or use ← → keys
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
