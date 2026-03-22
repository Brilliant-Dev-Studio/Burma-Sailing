import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { canonicalUrl } from '@/lib/siteConfig'

const ease = [0.22, 1, 0.36, 1] as const
const dur = 0.5

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: dur, ease } },
}

const stagger = (gap: number, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
})

const pageMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

/** မြေပုံ — user order: ၃ ပုံ */
const MAP_IMAGES = [
  {
    src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774172781/IMG_2798_medehb.jpg',
    alt: 'Lampi Marine National Park — map overview',
  },
  {
    src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774172782/IMG_2799_scnag7.jpg',
    alt: 'Lampi Marine National Park — map detail',
  },
  {
    src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774172053/oikos-lampi-1_7_hshszz.jpg',
    alt: 'Lampi Marine National Park — Oikos map',
  },
] as const

const GALLERY_IMAGES = [
  { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774172780/IMG_2810_rz7jzc.jpg', alt: 'Lampi — coastal scenery' },
  { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774172780/IMG_2815_ch2m39.jpg', alt: 'Lampi — island landscape' },
  { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774172780/IMG_2816_nfauey.jpg', alt: 'Lampi — beaches and forest' },
  { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774172780/IMG_2814_uukfup.jpg', alt: 'Lampi — Mergui Archipelago' },
  { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774172779/IMG_2806_snlrti.jpg', alt: 'Lampi — marine national park' },
  { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774172779/IMG_2807_yyz4d6.jpg', alt: 'Lampi — cruising grounds' },
  { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774172779/IMG_2811_ri97gh.jpg', alt: 'Lampi — nature' },
  { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774172779/IMG_2808_gdlkrn.jpg', alt: 'Lampi — islands' },
  { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774172779/IMG_2805_bcolbv.jpg', alt: 'Lampi — shoreline' },
  { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774172782/IMG_2804_wd7pew.jpg', alt: 'Lampi — Archipelago views' },
  { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774172782/IMG_2802_p4urwf.jpg', alt: 'Lampi — wildlife habitat' },
] as const

const PATH = '/destinations/lampi-marine-national-park'
const OG_IMAGE = MAP_IMAGES[2].src

function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string | null
  alt: string
  onClose: () => void
}) {
  useEffect(() => {
    if (!src) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [src, onClose])

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/88 backdrop-blur-sm cursor-default"
            onClick={onClose}
            aria-label="Close enlarged image"
          />
          <motion.div
            className="relative z-[101] max-h-[min(90dvh,900px)] max-w-[min(96vw,1200px)] w-full"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-1 -right-1 z-[102] flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg hover:bg-slate-100 md:-right-12 md:top-0"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
            <div className="overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-white/10">
              <img src={src} alt={alt} className="max-h-[min(90dvh,900px)] w-full object-contain" />
            </div>
            <p className="mt-3 text-center text-[13px] text-white/70">{alt}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** မြေပုံ — grid cell အတွက် full width */
function MapFigure({
  img,
  index,
  total,
  onOpen,
}: {
  img: (typeof MAP_IMAGES)[number]
  index: number
  total: number
  onOpen: (src: string) => void
}) {
  return (
    <motion.figure
      className="min-w-0 w-full"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <button
        type="button"
        onClick={() => onOpen(img.src)}
        className="group relative w-full overflow-hidden rounded-2xl bg-slate-100 text-left ring-1 ring-slate-200/80 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.2)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-12px_rgba(15,23,42,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
      >
        <div className="aspect-[4/3] w-full md:aspect-[16/11]">
          <img
            src={img.src}
            alt={img.alt}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" />
          </svg>
          View
        </span>
      </button>
      <figcaption className="mt-2 flex items-center justify-between gap-2 px-0.5 text-[12px] text-slate-500">
        <span className="line-clamp-1">{img.alt.replace(/^Lampi Marine National Park — /, '')}</span>
        <span className="shrink-0 tabular-nums text-slate-400">
          {index + 1}/{total}
        </span>
      </figcaption>
    </motion.figure>
  )
}

/** ဓာတ်ပုံ တစ်ပုံ — နှစ်ကော်လံ grid ထဲမှာ သုံးပါတယ် */
function GalleryPhoto({
  src,
  alt,
  onOpen,
}: {
  src: string
  alt: string
  onOpen: (src: string) => void
}) {
  return (
    <motion.figure
      className="min-w-0 w-full"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      <button
        type="button"
        onClick={() => onOpen(src)}
        className="group relative w-full overflow-hidden rounded-2xl bg-slate-100 text-left ring-1 ring-slate-200/70 shadow-[0_6px_24px_-10px_rgba(15,23,42,0.18)] transition-all duration-300 hover:shadow-[0_12px_36px_-12px_rgba(15,23,42,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
      >
        <div className="aspect-[4/3] w-full sm:aspect-[5/4]">
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        </div>
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute bottom-2.5 left-2.5 right-2.5 text-[11px] font-medium text-white opacity-0 drop-shadow transition-opacity duration-300 group-hover:opacity-100">
          Tap to enlarge
        </span>
      </button>
    </motion.figure>
  )
}

/** နှစ်ပုံတွဲ တစ်တန်း — grid ၂ ကော်လံ */
function PhotoPairRow({
  left,
  right,
  onOpen,
}: {
  left: { src: string; alt: string }
  right: { src: string; alt: string }
  onOpen: (src: string, alt: string) => void
}) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={stagger(0.08, 0)}
    >
      <GalleryPhoto src={left.src} alt={left.alt} onOpen={(s) => onOpen(s, left.alt)} />
      <GalleryPhoto src={right.src} alt={right.alt} onOpen={(s) => onOpen(s, right.alt)} />
    </motion.div>
  )
}

/** နောက်ဆုံး ပုံတစ်ပုံသာ — အလယ်ချိန် */
function PhotoSingleCentered({
  img,
  onOpen,
}: {
  img: { src: string; alt: string }
  onOpen: (src: string, alt: string) => void
}) {
  return (
    <div className="mx-auto max-w-lg">
      <GalleryPhoto src={img.src} alt={img.alt} onOpen={(s) => onOpen(s, img.alt)} />
    </div>
  )
}

export default function LampiMarineNationalPark() {
  const desc =
    "Myanmar's only marine national park — Lampi Island and surrounding islets in the Mergui Archipelago. Permits, access from Kawthaung, biodiversity, and practical visitor information."

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [lightboxAlt, setLightboxAlt] = useState('')

  const openLightbox = useCallback((src: string, alt?: string) => {
    setLightboxSrc(src)
    setLightboxAlt(alt ?? '')
  }, [])

  const closeLightbox = useCallback(() => setLightboxSrc(null), [])

  return (
    <motion.div
      variants={pageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
    >
      <Helmet>
        <title>Burma Sailing | Lampi Marine National Park</title>
        <link rel="canonical" href={canonicalUrl(PATH)} />
        <meta name="description" content={desc} />
        <meta
          name="keywords"
          content="Lampi Marine National Park, Mergui Archipelago, Myanmar marine park, Kawthaung sailing, Lampi Island, dugong Myanmar, Moken Sea Gypsy"
        />
        <meta property="og:url" content={canonicalUrl(PATH)} />
        <meta property="og:title" content="Burma Sailing | Lampi Marine National Park" />
        <meta property="og:description" content={desc} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Burma Sailing" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Burma Sailing | Lampi Marine National Park" />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <ImageLightbox src={lightboxSrc} alt={lightboxAlt} onClose={closeLightbox} />

      {/* Hero */}
      <div className="relative h-[min(68svh,520px)] overflow-hidden rounded-b-[4px]">
        <img
          src={MAP_IMAGES[2].src}
          alt="Lampi Marine National Park hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/70" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12 text-white max-w-4xl">
          <nav className="text-[12px] text-white/70 mb-4" aria-label="Breadcrumb">
            <a href="/destinations" className="hover:text-white underline-offset-2 hover:underline">
              Destinations
            </a>
            <span className="mx-2">/</span>
            <span className="text-white/90">Lampi Marine National Park</span>
          </nav>
          <h1 className="text-[28px] md:text-[44px] lg:text-[52px] font-[600] leading-tight">
            Lampi Marine National Park, Mergui Archipelago
          </h1>
          <p className="mt-3 text-[14px] md:text-[15px] text-white/85 font-medium tracking-wide">
            10°55′ N, 98°11′ E
          </p>
        </div>
      </div>

      <article className="px-3 md:px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-3xl pt-10 md:pt-14">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.08, 0.05)}
            className="space-y-5 text-[15px] md:text-[16px] leading-relaxed text-slate-600"
          >
            <motion.p variants={fadeUp}>
              Lampi Marine National Park is located about 50 nautical miles north-west of Kawthaung in the Mergui
              Archipelago. It is the only marine national park in Myanmar and was designated as such in 1996,
              following Visit Myanmar Year. The park covers more than 50,600 acres, combining major Lampi Island with
              about 20 smaller surrounding islands.
            </motion.p>
            <motion.p variants={fadeUp}>
              The main Lampi Island runs roughly north to south, about 29 miles long and almost 4 miles wide. The
              coast is hilly and rocky, with many sandy beaches, bays, and islets. The island is covered by lowland
              evergreen forest, diverse mangrove species along tidal creeks and rivers, fresh-water sources, and
              beaches all around.
            </motion.p>
          </motion.div>
        </div>

        {/* မြေပုံ — mobile တစ်ကော်လံ၊ md+ မှာ grid ၃ ကော်လံ */}
        <section className="mx-auto mt-14 max-w-screen-xl md:mt-16">
          <motion.div
            className="mb-6 border-l-2 border-teal-600/40 pl-4 md:mb-8"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Park maps</h2>
            <p className="mt-1 text-[14px] text-slate-600">
              Reference charts for location and boundaries — tap any map to view full size.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-5">
            {MAP_IMAGES.map((img, i) => (
              <MapFigure key={img.src} img={img} index={i} total={MAP_IMAGES.length} onOpen={(s) => openLightbox(s, img.alt)} />
            ))}
          </div>
        </section>

        {/* စာသား max-w-3xl၊ ဓာတ်ပုံတွေ max-w-screen-xl မှာ နှစ်ပုံတွဲတန်း */}
        <div className="mx-auto max-w-screen-xl mt-16 md:mt-20 space-y-10 md:space-y-12">
          <div className="mx-auto max-w-3xl space-y-5">
            <motion.p
              className="text-[15px] md:text-[16px] leading-relaxed text-slate-600"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              The island protects rich biodiversity, including many endangered bird species and 68 different mangrove
              species — out of about 80 mangrove species known worldwide. Large areas support coral reefs and seagrass
              beds that are vital habitat for molluscs, fish, sea turtles, and one of the region’s rarest and most
              critically endangered animals, the dugong.
            </motion.p>
            <motion.p
              className="text-[15px] md:text-[16px] leading-relaxed text-slate-600"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              Lampi Marine National Park also provides food, water, and livelihood resources for the local Sea Gypsy
              (Moken) communities who live around the park area.
            </motion.p>
          </div>
          <PhotoPairRow
            left={GALLERY_IMAGES[0]}
            right={GALLERY_IMAGES[1]}
            onOpen={openLightbox}
          />

          <div className="mx-auto max-w-3xl space-y-5">
            <motion.p
              className="text-[15px] md:text-[16px] leading-relaxed text-slate-600"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              Lampi is reachable from either Yangon, Myanmar, or Ranong, Thailand. In the high season, many domestic
              flights serve Kawthaung airport — about 2 hours 45 minutes from Yangon. The Union Highway from Yangon to
              Kawthaung is also an option, taking roughly 30 hours by express bus.
            </motion.p>
            <motion.p
              className="text-[15px] md:text-[16px] leading-relaxed text-slate-600"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              From Thailand, a local long-tail boat crosses the Pakchan River from Ranong to Kawthaung in about 45
              minutes, typically costing around 300–400 Thai Baht.
            </motion.p>
          </div>
          <PhotoPairRow
            left={GALLERY_IMAGES[2]}
            right={GALLERY_IMAGES[3]}
            onOpen={openLightbox}
          />

          <div className="mx-auto max-w-3xl">
            <motion.p
              className="text-[15px] md:text-[16px] leading-relaxed text-slate-600"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              You can then arrange access through a Myanmar-licensed tour company to reach Lampi Marine National Park.
              International visitors need an e-visa or tourist visa plus a special permit organised by a licensed local
              operator. If you plan to visit by liveaboard or private sailing yacht, special permits from the Union
              Government are required — arranged through our Burma Sailing yacht agency — and should be applied for at
              least two weeks before you enter Myanmar waters.
            </motion.p>
          </div>
          <PhotoPairRow
            left={GALLERY_IMAGES[4]}
            right={GALLERY_IMAGES[5]}
            onOpen={openLightbox}
          />

          <div className="mx-auto max-w-3xl space-y-5">
            <motion.p
              className="text-[15px] md:text-[16px] leading-relaxed text-slate-600"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              Accommodation for international visitors in the park remains limited. At present, Wa Ale Eco Resort and
              AALUA Hotel &amp; Resort are the main options inside the park area.
            </motion.p>
            <motion.p
              className="text-[15px] md:text-[16px] leading-relaxed text-slate-600"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              Domestic visitors do not require permits to visit Lampi Marine National Park and can book through local tour
              companies.
            </motion.p>
          </div>
          <PhotoPairRow
            left={GALLERY_IMAGES[6]}
            right={GALLERY_IMAGES[7]}
            onOpen={openLightbox}
          />

          <div className="mx-auto max-w-3xl">
            <motion.p
              className="text-[15px] md:text-[16px] leading-relaxed text-slate-600"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              The best time to visit Lampi is October to April, during Myanmar’s dry season. The island has roosting
              trees for Plain-pouched hornbills; the best months to watch them are December to April.
            </motion.p>
          </div>
          <PhotoPairRow
            left={GALLERY_IMAGES[8]}
            right={GALLERY_IMAGES[9]}
            onOpen={openLightbox}
          />

          <PhotoSingleCentered img={GALLERY_IMAGES[10]} onOpen={openLightbox} />
        </div>

        <motion.div
          className="mx-auto max-w-screen-xl mt-16 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-8 text-[14px] font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Plan your visit — contact us
          </a>
          <a
            href="/destinations"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 px-8 text-[14px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            All destinations
          </a>
        </motion.div>
      </article>
    </motion.div>
  )
}
