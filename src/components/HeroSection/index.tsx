import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HomeTestimonialsSection from "@/components/HomeTestimonialsSection";

// HQ cached across SPA navigations — skip LQ on revisit
const hqCached = new Set<string>()

const CLOUD = 'https://res.cloudinary.com/dvbgmlsvl/video/upload'

// Hero video (new high-res clip)
const HERO_PUBLIC_ID = '1773887089358273_szckun'
const HERO_VERSION  = 'v1774076397'
const HERO_HQ_URL   = `${CLOUD}/w_1920,q_auto:best/${HERO_VERSION}/${HERO_PUBLIC_ID}.mp4`
const HERO_LQ_URL   = `${CLOUD}/w_720,q_38/${HERO_VERSION}/${HERO_PUBLIC_ID}.mp4`
// Mobile hero: video shown in a card (~half width of screen) — sharper than full-bleed upscale
const HERO_MOBILE_HQ_URL = `${CLOUD}/w_960,q_auto:good/${HERO_VERSION}/${HERO_PUBLIC_ID}.mp4`
const HERO_MOBILE_LQ_URL = `${CLOUD}/w_520,q_42/${HERO_VERSION}/${HERO_PUBLIC_ID}.mp4`

// About-section video
const VIDEO_PUBLIC_ID =
  '0-02-06-1bf475a828eb15188c6d975111c04b66ce8a8654f8968dc34a42fbb0cfc92aa9_2217f6e8e35_qoxfys'
const VIDEO_VERSION = 'v1773997431'
// Full-quality URL
const HQ_URL = `${CLOUD}/${VIDEO_VERSION}/${VIDEO_PUBLIC_ID}.mp4`
// Medium-quality placeholder — acceptable visual while HQ buffers
const LQ_URL = `${CLOUD}/q_40,w_854/${VIDEO_VERSION}/${VIDEO_PUBLIC_ID}.mp4`

export const HeroSection = () => {
  // ── Hero video state ──────────────────────────────────────────────────────
  const [heroLqReady, setHeroLqReady] = useState(false)
  const [heroHqReady, setHeroHqReady] = useState(
    () => hqCached.has(HERO_HQ_URL) || hqCached.has(HERO_MOBILE_HQ_URL),
  )
  const heroLqRef = useRef<HTMLVideoElement>(null)
  const heroHqRef = useRef<HTMLVideoElement>(null)

  // ── About-section video state ─────────────────────────────────────────────
  const [lqReady, setLqReady] = useState(false)
  const [hqReady, setHqReady] = useState(() => hqCached.has(HQ_URL))
  const videoLqRef = useRef<HTMLVideoElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (heroHqRef.current && heroHqRef.current.readyState >= 3) {
      hqCached.add(HERO_MOBILE_HQ_URL)
      setHeroHqReady(true)
    }
    if (heroLqRef.current && heroLqRef.current.readyState >= 3) setHeroLqReady(true)
    const hq = videoRef.current
    const lq = videoLqRef.current
    if (hq && hq.readyState >= 3) { hqCached.add(HQ_URL); setHqReady(true) }
    if (lq && lq.readyState >= 3) setLqReady(true)
  }, [])

  const handleLqCanPlay = () => setLqReady(true)
  const handleHqCanPlay = () => { hqCached.add(HQ_URL); setHqReady(true) }

  const previewImages = [
    { src: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983722/viber_image_2026-03-19_09-03-28-612_estxxi.jpg",  alt: "Interiors & Details" },
    { src: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983743/viber_image_2026-03-19_09-10-09-093_obs4dr.jpg",  alt: "Deck Moments" },
    { src: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993972/viber_image_2026-03-19_08-58-20-037_rpvrnj.jpg",  alt: "Island Light" },
    { src: "/IMG_2671.JPG",  alt: "Journeys & Memories" },
    { src: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993970/viber_image_2026-03-19_08-58-19-806_twqczy.jpg",  alt: "Open Waters" },
    { src: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774258652/203f230b-92f2-46a3-94ca-aba668eeedb6_3_g9u79n.jpg",  alt: "Crew Life" },
  ];

  const faqs = useMemo(
    () => [
      {
        title: "What does Burma Sailing actually do?",
        description:
          "We are a licensed yacht agency based in Kawthaung, Myanmar. We handle everything visiting yachts need — cruising permits, port clearance, crew visas, provisioning, fuel, and local route guidance across the Mergui Archipelago.",
      },
      {
        title: "Where do I enter Myanmar by sea?",
        description:
          "The official entry port for visiting yachts is Kawthaung — the southernmost town in Myanmar, directly across from Ranong, Thailand. All clearance procedures are handled here before you proceed into the Archipelago.",
      },
      {
        title: "Do I need a special permit to sail the Mergui Archipelago?",
        description:
          "Yes. Foreign vessels require a Myanmar Cruising Permit issued through an authorised agent. Burma Sailing manages the full permit application on your behalf, coordinating with the relevant government departments.",
      },
      {
        title: "What is the best time of year to visit?",
        description:
          "The cool season (November – February) offers the most comfortable sailing with settled northeast winds, clear skies, and calm anchorages. The hot season (March – May) is still navigable; the rainy season (June – October) is generally avoided by cruising yachts.",
      },
      {
        title: "How much notice do you need to arrange permits?",
        description:
          "We recommend contacting us at least 2 – 4 weeks before your intended arrival. Permit processing times vary by season, so earlier notice gives us the best chance to secure everything before you arrive.",
      },
      {
        title: "What are the tidal conditions like in the region?",
        description:
          "Tidal awareness is essential here. The range at Kawthaung entry port reaches 3 m, while parts of the broader Archipelago can see up to 5 m — significantly larger than Phuket. Our team briefs every vessel on local tidal patterns, and the region offers excellent natural harbours for day and overnight anchorages.",
      },
    ],
    [],
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const ease = [0.22, 1, 0.36, 1] as const;
  const dur = 0.48;

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: dur, ease } },
  };

  const stagger = (gap: number, delayChildren = 0) => ({
    hidden: {},
    visible: { transition: { staggerChildren: gap, delayChildren } },
  });

  const galleryItem = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease } },
  };

  // ── Parallax for Final CTA (laptop only) ──────────────────────────────────
  const ctaRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  })
  const ctaY = useTransform(ctaScroll, [0, 1], [-50, 50])

  return (
    <div>
      <style>{`
        @keyframes waveFlow1 { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes waveFlow2 { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .hero-wave-layer { will-change: transform; }
      `}</style>
      {/* ── Hero — Bento Grid ── */}

      {/* Mobile: text + bento-style media (sharp video in card, not full-bleed) + wave */}
      <div className="lg:hidden relative overflow-hidden bg-white pb-14">
        <motion.div
          className="px-4 pt-8 pb-5 text-slate-900"
          initial="hidden"
          animate="visible"
          variants={stagger(0.11, 0.06)}
        >
          <motion.p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-medium" variants={fadeUp}>
            Kawthaung, Myanmar
          </motion.p>
          <motion.h1 className="mt-3 text-[28px] sm:text-[32px] font-[600] leading-[1.12]" variants={fadeUp}>
            <span className="block">Burma Sailing</span>
            <span className="mt-2 block text-[22px] sm:text-[26px] font-[500] leading-[1.15] text-slate-700">
              Your Trusted Passage to the Mergui Archipelago
            </span>
          </motion.h1>
          <motion.p className="mt-4 text-[14px] leading-relaxed text-slate-500 max-w-[40ch]" variants={fadeUp}>
            <span className="text-slate-800 font-medium">Burma Sailing</span>
            {' '}
            is a licensed yacht agency — permits, clearance, guides, and local support for the Mergui Archipelago.
          </motion.p>
          <motion.div className="mt-6 flex flex-wrap items-center gap-2.5" variants={fadeUp}>
            <a href="/contact"
              className="inline-flex h-11 items-center rounded-full bg-slate-900 px-6 text-[14px] font-semibold text-white"
            >Contact Us</a>
            <a href="/services"
              className="inline-flex h-11 items-center rounded-full border border-slate-200 px-6 text-[14px] text-slate-600"
            >Services</a>
          </motion.div>
          <motion.div className="mt-8 flex flex-wrap gap-6 border-t border-slate-100 pt-6" variants={fadeUp}>
            {[
              { value: '800+', label: 'Islands' },
              { value: '10,000 sq mi', label: 'Waters' },
              { value: 'Kawthaung', label: 'Entry port' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[17px] font-[600] text-slate-900 leading-none">{s.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-400">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Media grid — video stays small on screen = reads sharper */}
        <div className="px-3 pb-1">
          <div className="mx-auto grid max-w-lg grid-cols-2 gap-2 sm:max-w-none sm:px-1">
            <div className="relative col-span-2 h-[210px] overflow-hidden rounded-xl bg-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.1)] sm:h-[230px]">
              {!heroHqReady && (
                <video
                  ref={heroLqRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onCanPlay={() => setHeroLqReady(true)}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${heroLqReady ? 'opacity-100' : 'opacity-0'}`}
                >
                  <source src={HERO_MOBILE_LQ_URL} type="video/mp4" />
                </video>
              )}
              <video
                ref={heroHqRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onCanPlay={() => {
                  hqCached.add(HERO_MOBILE_HQ_URL)
                  setHeroHqReady(true)
                }}
                onError={() => {
                  if (!heroHqReady) setHeroLqReady(true)
                }}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${heroHqReady ? 'opacity-100' : 'opacity-0'}`}
              >
                <source src={HERO_MOBILE_HQ_URL} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
            {[
              { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/w_420,q_auto,f_auto/v1773983722/viber_image_2026-03-19_09-03-28-612_estxxi.jpg', alt: 'Islands' },
              { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/w_420,q_auto,f_auto/v1773993978/viber_image_2026-03-19_09-00-26-594_dub4nt.jpg', alt: 'Sailing' },
              { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/w_420,q_auto,f_auto/v1773993972/viber_image_2026-03-19_08-58-20-037_rpvrnj.jpg', alt: 'Island light' },
              { src: 'https://res.cloudinary.com/dvbgmlsvl/image/upload/w_420,q_auto,f_auto/v1773983753/viber_image_2026-03-19_09-18-41-452_d1kxbd.jpg', alt: 'Coast' },
            ].map((img) => (
              <div
                key={img.src}
                className="relative h-[108px] overflow-hidden rounded-xl bg-slate-100 shadow-sm sm:h-[118px]"
              >
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tint + wave */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-[88px]"
          style={{ background: 'linear-gradient(to top, rgba(203,213,225,0.18) 0%, rgba(219,234,254,0.28) 50%, transparent 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 z-[2] h-[70px] overflow-hidden pointer-events-none [filter:drop-shadow(0_-2px_12px_rgba(0,0,0,0.08))]">
          <div className="hero-wave-layer" style={{ animation: 'waveFlow1 6.5s linear infinite', width: '200%', position: 'absolute', bottom: 0, left: 0 }}>
            <svg viewBox="0 0 2880 65" preserveAspectRatio="none" style={{ width: '100%', height: '62px', display: 'block' }}>
              <path d="M0,32 C360,65 720,0 1080,32 C1440,65 1800,0 2160,32 C2520,65 2750,10 2880,32 L2880,65 L0,65 Z" fill="white" fillOpacity="0.62"/>
            </svg>
          </div>
          <div className="hero-wave-layer" style={{ animation: 'waveFlow2 4.5s linear infinite reverse', width: '200%', position: 'absolute', bottom: 0, left: 0 }}>
            <svg viewBox="0 0 2880 65" preserveAspectRatio="none" style={{ width: '100%', height: '62px', display: 'block' }}>
              <path d="M0,45 C480,15 960,60 1440,40 C1920,20 2400,55 2880,45 L2880,65 L0,65 Z" fill="white" fillOpacity="0.96"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Desktop (lg+): Split hero — text left + bento grid right */}
      <div className="hidden lg:flex min-h-[92svh] items-stretch relative overflow-hidden bg-white pb-16">

        {/* Left — Text panel */}
        <div className="relative z-10 flex flex-col justify-center px-10 xl:px-16 py-20 lg:w-[42%] xl:w-[40%] shrink-0">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.12, 0.06)}>

            <motion.p className="text-[12px] uppercase tracking-[0.2em] text-slate-400" variants={fadeUp}>
              Kawthaung, Myanmar
            </motion.p>

            <motion.h1
              className="mt-4 text-[38px] xl:text-[48px] font-[600] leading-[1.1] text-slate-900"
              variants={fadeUp}
            >
              <span className="block">Burma Sailing</span>
              <span className="mt-3 block text-[26px] xl:text-[32px] font-[500] leading-[1.15] text-slate-700">
                Your Trusted Passage to the Mergui Archipelago
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-[15px] xl:text-[16px] leading-relaxed text-slate-500 max-w-[36ch]"
              variants={fadeUp}
            >
              <span className="text-slate-800 font-medium">Burma Sailing</span>
              {' '}
              is a licensed yacht agency based in Kawthaung. We handle permits, clearance, guides, and everything your vessel needs to sail the Mergui Archipelago.
            </motion.p>

            <motion.div className="mt-8 flex items-center gap-3" variants={fadeUp}>
              <a href="/contact"
                className="inline-flex h-11 items-center rounded-full bg-slate-900 px-7 text-[14px] font-semibold text-white hover:bg-slate-800 transition-colors"
              >Contact Us</a>
              <a href="/services"
                className="inline-flex h-11 items-center rounded-full border border-slate-200 px-7 text-[14px] text-slate-600 hover:bg-slate-50 transition-colors"
              >Our Services</a>
            </motion.div>

            <motion.div
              className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-10"
            variants={fadeUp}
            >
              {[
                { value: '800+', label: 'Islands' },
                { value: '10,000 sq mi', label: 'of waters' },
                { value: 'Kawthaung', label: 'Entry port' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-[18px] xl:text-[20px] font-[600] text-slate-900 leading-none">{s.value}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{s.label}</p>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>

        {/* Thin divider */}
        <div className="absolute top-[15%] bottom-[20%] w-px bg-slate-100 z-20 pointer-events-none" style={{ left: '41%' }} />

        {/* Right — Bento Grid (4 cols) */}
        <div className="relative z-10 flex-1 p-4 xl:p-6 flex items-center">
          <motion.div
            className="w-full grid gap-2.5"
            style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
            initial="hidden"
            animate="visible"
            variants={stagger(0.07, 0.25)}
          >
            {/* Video — col 1-2, row 1-2 */}
            <motion.div
              className="relative overflow-hidden rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.13)]"
              style={{ gridColumn: '1 / 3', gridRow: '1 / 3', height: '440px' }}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <div className="absolute inset-0 bg-slate-100" />
              {!heroHqReady && (
                <video autoPlay muted loop playsInline preload="auto"
                  onCanPlay={() => setHeroLqReady(true)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${heroLqReady ? 'opacity-100' : 'opacity-0'}`}
                >
                  <source src={HERO_LQ_URL} type="video/mp4" />
                </video>
              )}
              <video autoPlay muted loop playsInline preload="auto"
                onCanPlay={() => { hqCached.add(HERO_HQ_URL); setHeroHqReady(true) }}
                onError={() => { if (!heroHqReady) setHeroLqReady(true) }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${heroHqReady ? 'opacity-100' : 'opacity-0'}`}
              >
                <source src={HERO_HQ_URL} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            {/* Img A — col 3, row 1 */}
            <motion.div className="relative overflow-hidden rounded-xl shadow-[0_2px_14px_rgba(0,0,0,0.10)]"
              style={{ gridColumn: '3', gridRow: '1', height: '214px' }}
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <img src="https://res.cloudinary.com/dvbgmlsvl/image/upload/w_500,q_auto,f_auto/v1773983722/viber_image_2026-03-19_09-03-28-612_estxxi.jpg"
                alt="Mergui Islands" className="w-full h-full object-cover" />
            </motion.div>

            {/* Img B — col 4, row 1 */}
            <motion.div className="relative overflow-hidden rounded-xl shadow-[0_2px_14px_rgba(0,0,0,0.10)]"
              style={{ gridColumn: '4', gridRow: '1', height: '214px' }}
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <img src="https://res.cloudinary.com/dvbgmlsvl/image/upload/w_500,q_auto,f_auto/v1773993978/viber_image_2026-03-19_09-00-26-594_dub4nt.jpg"
                alt="Sailing" className="w-full h-full object-cover" />
            </motion.div>

            {/* Img C — col 3, row 2 */}
            <motion.div className="relative overflow-hidden rounded-xl shadow-[0_2px_14px_rgba(0,0,0,0.10)]"
              style={{ gridColumn: '3', gridRow: '2', height: '214px' }}
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <img src="https://res.cloudinary.com/dvbgmlsvl/image/upload/w_500,q_auto,f_auto/v1773993972/viber_image_2026-03-19_08-58-20-037_rpvrnj.jpg"
                alt="Island light" className="w-full h-full object-cover" />
            </motion.div>

            {/* Img D — col 4, row 2 */}
            <motion.div className="relative overflow-hidden rounded-xl shadow-[0_2px_14px_rgba(0,0,0,0.10)]"
              style={{ gridColumn: '4', gridRow: '2', height: '214px' }}
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <img src="https://res.cloudinary.com/dvbgmlsvl/image/upload/w_500,q_auto,f_auto/v1773983756/viber_image_2026-03-20_08-30-44-471_visy4t.jpg"
                alt="Islands" className="w-full h-full object-cover" />
            </motion.div>

            {/* Img E — col 1, row 3 */}
            <motion.div className="relative overflow-hidden rounded-xl shadow-[0_2px_14px_rgba(0,0,0,0.10)]"
              style={{ gridColumn: '1', gridRow: '3', height: '158px' }}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <img src="https://res.cloudinary.com/dvbgmlsvl/image/upload/w_500,q_auto,f_auto/v1773983743/viber_image_2026-03-19_09-10-09-093_obs4dr.jpg"
                alt="Sailing" className="w-full h-full object-cover" />
            </motion.div>

            {/* Img F — col 2-3, row 3 */}
            <motion.div className="relative overflow-hidden rounded-xl shadow-[0_2px_14px_rgba(0,0,0,0.10)]"
              style={{ gridColumn: '2 / 4', gridRow: '3', height: '158px' }}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <img src="https://res.cloudinary.com/dvbgmlsvl/image/upload/w_800,q_auto,f_auto/v1774074441/203f230b-92f2-46a3-94ca-aba668eeedb6_izk1rm.jpg"
                alt="Onboard" className="w-full h-full object-cover" />
            </motion.div>

            {/* Img G — col 4, row 3 */}
            <motion.div className="relative overflow-hidden rounded-xl shadow-[0_2px_14px_rgba(0,0,0,0.10)]"
              style={{ gridColumn: '4', gridRow: '3', height: '158px' }}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <img src="https://res.cloudinary.com/dvbgmlsvl/image/upload/w_500,q_auto,f_auto/v1773983753/viber_image_2026-03-19_09-18-41-452_d1kxbd.jpg"
                alt="Islands" className="w-full h-full object-cover" />
            </motion.div>
        </motion.div>
        </div>

        {/* Bottom tint — soft contrast so wave reads on white (not loud) */}
        <div className="absolute bottom-0 left-0 right-0 h-[120px] z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(203,213,225,0.22) 0%, rgba(219,234,254,0.38) 45%, transparent 100%)' }} />

        {/* Animated wave */}
        <div className="absolute bottom-0 left-0 right-0 h-[84px] z-30 overflow-hidden pointer-events-none [filter:drop-shadow(0_-1px_10px_rgba(15,23,42,0.06))]">
          <div className="hero-wave-layer" style={{ animation: 'waveFlow1 8s linear infinite', width: '200%', position: 'absolute', bottom: 0, left: 0 }}>
            <svg viewBox="0 0 2880 80" preserveAspectRatio="none" style={{ width: '100%', height: '76px', display: 'block' }}>
              <path d="M0,38 C240,76 480,4 720,38 C960,72 1200,8 1440,38 C1680,68 1920,4 2160,38 C2400,72 2640,8 2880,38 L2880,80 L0,80 Z" fill="white" fillOpacity="0.7"/>
            </svg>
          </div>
          <div className="hero-wave-layer" style={{ animation: 'waveFlow2 5.2s linear infinite reverse', width: '200%', position: 'absolute', bottom: 0, left: 0 }}>
            <svg viewBox="0 0 2880 80" preserveAspectRatio="none" style={{ width: '100%', height: '76px', display: 'block' }}>
              <path d="M0,52 C360,18 720,68 1080,48 C1440,28 1800,62 2160,44 C2520,24 2750,58 2880,52 L2880,80 L0,80 Z" fill="white" fillOpacity="0.98"/>
            </svg>
          </div>
        </div>

      </div>

      {/* ── About Us ── */}
      <section className="mt-[80px] md:mt-[100px] px-3 md:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <div className="md:grid md:grid-cols-2 md:gap-12 lg:gap-20 md:items-start">

            {/* Left — text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger(0.11, 0)}
        >
              <motion.p className="uppercase text-[13px] md:text-[14px] font-semibold tracking-[0.18em] text-slate-500" variants={fadeUp}>
            Effortless • Adventurous • Premium
          </motion.p>
              <motion.p className="mt-5 text-[32px] md:text-[38px] lg:text-[46px] xl:text-[52px] font-[500] leading-tight text-slate-900" variants={fadeUp}>
                Empowering seamless exploration through expert local logistics
                and deep regional knowledge.
          </motion.p>
              <motion.div variants={fadeUp} className="mt-8">
                <a
                  href="/about"
                  className="inline-flex h-12 items-center rounded-full bg-black px-8 text-[15px] font-semibold text-white hover:bg-black/85 transition-colors"
                >
              About Us
                </a>
          </motion.div>
              <motion.p className="mt-8 text-[15px] md:text-[16px] leading-relaxed text-slate-600 max-w-[60ch]" variants={fadeUp}>
                Burma Sailing is a dedicated yacht agency specializing in
                supporting visiting sailing yachts and expedition vessels
                cruising the extraordinary water of the Mergui Archipelago in
                southern Myanmar. With deep local knowledge and years of
                experience, we act as the vital link between international
                sailors and one of Southeast Asia's most remote and unspoiled
                cruising destinations.
          </motion.p>
        </motion.div>

            {/* Right — video (visible md+) */}
            <motion.div
              className="mt-8 md:mt-0 relative overflow-hidden rounded-2xl"
              style={{ height: '420px' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease }}
            >
              {/* Base — dark bg so there's no white flash while LQ loads */}
              <div className="absolute inset-0 bg-slate-900" />

              {/* LQ video — placeholder while HQ buffers */}
              {!hqReady && (
                <video
                  ref={videoLqRef}
                  autoPlay muted loop playsInline preload="auto"
                  onCanPlay={handleLqCanPlay}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${lqReady ? 'opacity-100' : 'opacity-0'}`}
                >
                  <source src={LQ_URL} type="video/mp4" />
                </video>
              )}

              {/* HQ video — always loading in background, fades in when ready */}
          <video
                ref={videoRef}
                autoPlay muted loop playsInline preload="auto"
                onCanPlay={handleHqCanPlay}
            onError={() => {
                  // HQ failed — keep LQ visible as fallback
                  console.error('HQ video failed to load.')
                  if (!hqReady) setLqReady(true)
                }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${hqReady ? 'opacity-100' : 'opacity-0'}`}
              >
                <source src={HQ_URL} type="video/mp4" />
          </video>
              <p className="absolute bottom-6 left-5 right-5 text-white text-[14px] md:text-[15px] leading-relaxed">
            Sailing in this region is not like cruising in mainstream
                destinations. It requires trusted local expertise, careful
                coordination, and an understanding of both the sea and the
                system ashore.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      <HomeTestimonialsSection />

      {/* ── Gallery ── (testimonials sit just above — keep modest top gap) */}
      <section className="mt-12 md:mt-16 px-3 md:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
        <motion.div
          className="flex items-end justify-between gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={stagger(0.1, 0)}
        >
          <div>
            <motion.p
              className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-500"
              variants={fadeUp}
            >
              Gallery
            </motion.p>
            <motion.p
                className="mt-3 text-[30px] md:text-[36px] lg:text-[42px] font-[600] leading-tight text-slate-900"
              variants={fadeUp}
            >
              A glimpse of life onboard.
            </motion.p>
            <motion.p
                className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-slate-600 hidden md:block"
              variants={fadeUp}
            >
              Explore interiors, island moments, and the kind of quiet luxury
              you only get at sea.
            </motion.p>
          </div>
          <motion.a
            href="/gallery"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-black px-6 text-[14px] md:text-[15px] font-semibold text-white transition-colors hover:bg-black/90"
            variants={fadeUp}
          >
            More
          </motion.a>
        </motion.div>

        <motion.div
          className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={stagger(0.13, 0.12)}
        >
          {previewImages.map((img, idx) => {
              // 12-col grid layout:
              // Row 1: [0: col-7, row-span-2 tall] | [1: col-5]
              // Row 2: [0 cont.]                   | [2: col-2] [3: col-3]
              // Row 3: [4: col-4] [5: col-4] [6: col-4]
              // Row 4: [7: col-12 full-width]
            const tileClass =
                idx === 0 ? "col-span-2 md:col-span-7 md:row-span-2"
                : idx === 1 ? "col-span-1 md:col-span-5"
                : idx === 2 ? "col-span-1 md:col-span-2"
                : idx === 3 ? "col-span-2 md:col-span-3"
                : idx === 4 ? "col-span-2 md:col-span-4"
                : idx === 5 ? "col-span-1 md:col-span-4"
                : idx === 6 ? "col-span-1 md:col-span-4"
                : "col-span-2 md:col-span-12";

            const heightClass =
                idx === 0 ? "h-[380px] md:h-[540px] lg:h-[640px]"
                : idx === 1 ? "h-[190px] md:h-[260px] lg:h-[310px]"
                : idx === 2 ? "h-[190px] md:h-[260px] lg:h-[310px]"
                : idx === 3 ? "h-[190px] md:h-[260px] lg:h-[310px]"
                : idx === 4 ? "h-[220px] md:h-[300px] lg:h-[360px]"
                : idx === 5 ? "h-[220px] md:h-[300px] lg:h-[360px]"
                : idx === 6 ? "h-[220px] md:h-[300px] lg:h-[360px]"
                : "h-[240px] md:h-[340px] lg:h-[400px]";

              const caption = img.alt;

            return (
              <motion.a
                key={`${img.src}-${idx}`}
                href="/gallery"
                className={[
                  "group relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm",
                    "transition-shadow duration-300 hover:shadow-md",
                  tileClass,
                ].join(" ")}
                variants={galleryItem}
              >
                <div className={["relative w-full overflow-hidden", heightClass].join(" ")}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-[14px] md:text-[15px] font-semibold text-white">{caption}</p>
                      <p className="mt-1 text-[12px] md:text-[13px] text-white/80">Open gallery</p>
                    </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
        </div>
      </section>

      {/* ── Services banner ── */}
      <section className="mt-[100px] md:mt-[120px] px-3 md:px-6 lg:px-8 pb-10">
        <div className="mx-auto max-w-screen-xl">

          {/* Mobile / Tablet — full-bleed image card */}
        <motion.div
            className="lg:hidden relative h-[420px] md:h-[500px] w-full overflow-hidden rounded-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
        >
            <img src="https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170989/5ab9fc9c-c5a7-4cc1-8e0b-febfdc224300_2_nvhfdi.jpg" alt="Mergui sailing" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
            <div className="absolute top-8 left-6 right-[35%] md:left-10 md:top-10 text-white">
              <p className="uppercase text-[12px] md:text-[13px] font-semibold tracking-[0.18em]">Our Services</p>
              <p className="mt-3 text-[26px] md:text-[34px] leading-snug font-[500] max-w-[18ch]">
                Local Knowledge. Professional Support. Authentic Access.
            </p>
          </div>
          <a
              href="/services"
              className="absolute bottom-8 left-6 md:left-10 inline-flex h-11 items-center justify-center rounded-full bg-white px-7 text-[14px] font-semibold text-black hover:bg-white/90 transition-colors"
          >
            Explore Our Services
          </a>
        </motion.div>

          {/* Laptop — split: image left + content right */}
          <motion.div
            className="hidden lg:grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.1fr_0.9fr] overflow-hidden rounded-2xl"
            style={{ minHeight: '560px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger(0.1, 0)}
          >
            {/* Left — image */}
            <motion.div className="relative overflow-hidden" variants={fadeUp}>
              <img
                src="https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170989/5ab9fc9c-c5a7-4cc1-8e0b-febfdc224300_2_nvhfdi.jpg"
                alt="Mergui Archipelago — 800+ islands"
                className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/15" />
              {/* Caption floating bottom-left */}
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-semibold">Mergui Archipelago</p>
                <p className="mt-1 text-[15px] font-medium text-white/80 max-w-[22ch] leading-snug">
                  800+ islands across 10,000 sq miles of pristine waters.
                </p>
              </div>
            </motion.div>

            {/* Right — content */}
            <motion.div
              className="flex flex-col justify-between bg-[#0d0d0d] px-10 xl:px-14 py-12"
              variants={fadeUp}
            >
              {/* Top */}
              <div>
                <p className="uppercase text-[11px] font-semibold tracking-[0.22em] text-white/40">
                  Our Services
                </p>
                <h2 className="mt-4 text-[28px] xl:text-[34px] font-[600] leading-snug text-white max-w-[20ch]">
                  Local Knowledge.<br />Professional Support.<br />Authentic Access.
                </h2>
                <p className="mt-4 text-[14px] leading-relaxed text-white/50 max-w-[38ch]">
                  From permits to passage — we handle every detail so you can focus on the sea.
                </p>
              </div>

              {/* Service list */}
              <div className="mt-8 border-t border-white/10">
                {[
                  { n: '01', title: 'Cruising Permits & Pre-arrival' },
                  { n: '02', title: 'Immigration & Port Clearance' },
                  { n: '03', title: 'Itinerary Planning & Local Logistics' },
                  { n: '04', title: 'Licensed Guides & Compliance' },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="group flex items-center gap-5 border-b border-white/8 py-4 cursor-default"
                  >
                    <span className="text-[11px] tabular-nums text-white/25 w-5 shrink-0">{s.n}</span>
                    <span className="text-[14px] xl:text-[15px] font-[450] text-white/70 group-hover:text-white transition-colors duration-200">
                      {s.title}
                    </span>
                    <span className="ml-auto text-white/20 group-hover:text-white/60 transition-all duration-300 group-hover:translate-x-0.5 text-[16px]">
                      →
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <a
                  href="/services"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-white px-7 text-[13px] xl:text-[14px] font-semibold text-black hover:bg-white/90 transition-colors"
                >
                  Explore Our Services
                </a>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mt-[100px] md:mt-[120px] px-3 md:px-6 lg:px-8 pb-10">
        <div className="mx-auto max-w-screen-xl">
          <div className="lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:items-start">

            {/* Left — heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={stagger(0.1, 0)}
              className="lg:sticky lg:top-[100px]"
        >
          <motion.p
            className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-500"
            variants={fadeUp}
          >
            FAQ
          </motion.p>
          <motion.h2
                className="mt-3 text-[30px] md:text-[36px] lg:text-[40px] font-[600] leading-tight text-slate-900"
            variants={fadeUp}
          >
            We deliver exceptional experiences on the water.
          </motion.h2>
          <motion.p
                className="mt-4 text-[15px] md:text-[16px] leading-relaxed text-slate-600 max-w-[48ch]"
            variants={fadeUp}
          >
                Our values shape every journey, every interaction, and every
                detail we design.
          </motion.p>
        </motion.div>

            {/* Right — accordion */}
        <motion.div
              className="mt-10 lg:mt-0 divide-y divide-black/10 rounded-xl border border-black/10 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={stagger(0.09, 0.08)}
        >
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
                  <motion.div key={faq.title} className="px-5 py-5 md:px-7 md:py-6" variants={fadeUp}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                      onClick={() => setOpenFaqIndex((v) => (v === idx ? null : idx))}
                  aria-expanded={isOpen}
                >
                      <span className="text-[17px] md:text-[19px] font-semibold text-slate-900">
                    {faq.title}
                  </span>
                  <span
                    className={[
                          "grid h-9 w-9 md:h-10 md:w-10 shrink-0 place-items-center rounded-full border border-black text-black",
                      "transition-transform duration-200",
                      isOpen ? "rotate-45" : "rotate-0",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className={[
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                        <p className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-slate-600">
                      {faq.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="mt-[80px] md:mt-[100px] px-3 md:px-6 lg:px-8 pb-10">
        <div className="mx-auto max-w-screen-xl">

          {/* Mobile / Tablet */}
        <motion.div
            className="lg:hidden relative h-[460px] md:h-[540px] w-full overflow-hidden rounded-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
            <img src="/IMG_2675.JPG" alt="Ready to sail" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/55" />
            <div className="absolute top-8 left-6 right-[35%] md:left-10 md:top-12 text-white">
              <p className="uppercase text-[12px] md:text-[13px] font-semibold tracking-[0.18em]">
              Ready to Make Waves?
            </p>
              <p className="mt-3 text-[26px] md:text-[34px] leading-snug font-[500] max-w-[20ch]">
              Your perfect day on the water is just a few clicks away.
            </p>
          </div>
          <a
              href="/contact"
              className="absolute bottom-8 left-6 md:left-10 inline-flex h-11 items-center justify-center rounded-full bg-white px-7 text-[14px] font-semibold text-black hover:bg-white/90 transition-colors"
          >
            Contact Us Now
          </a>
        </motion.div>

          {/* Laptop — editorial full-width */}
          <motion.div
            ref={ctaRef}
            className="hidden lg:block relative w-full overflow-hidden rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger(0.1, 0)}
          >
            {/* Background image — parallax */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-x-0 will-change-transform"
                style={{ y: ctaY, top: -70, bottom: -70 }}
              >
                <img
                  src="https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983753/viber_image_2026-03-19_09-18-41-452_d1kxbd.jpg"
                  alt="Ready to sail"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-14 xl:px-20 pt-16 pb-0">

              {/* Top row — label + stat chips */}
              <motion.div className="flex items-center justify-between" variants={fadeUp}>
                <p className="uppercase text-[11px] font-semibold tracking-[0.24em] text-white/45">
                  Ready to Make Waves?
                </p>
                <div className="flex items-center gap-6">
                  {[
                    { value: 'Mergui', label: 'Archipelago' },
                    { value: '10,000', label: 'sq mi of waters' },
                    { value: 'Kawthaung', label: 'Entry Port' },
                  ].map((s) => (
                    <div key={s.label} className="text-right">
                      <p className="text-[20px] font-[600] text-white leading-none">{s.value}</p>
                      <p className="text-[11px] text-white/40 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Main headline */}
              <motion.p
                className="mt-10 text-[54px] xl:text-[68px] font-[600] leading-[1.05] text-white max-w-[18ch]"
                variants={fadeUp}
              >
                Your perfect day<br />on the water is just<br />
                <em className="not-italic text-white/55">a few clicks away.</em>
              </motion.p>

              {/* CTAs */}
              <motion.div className="mt-10 flex items-center gap-4" variants={fadeUp}>
                <a
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-[14px] font-semibold text-black hover:bg-white/90 transition-colors"
                >
                  Contact Us Now
                </a>
                <a
                  href="https://wa.me/959250886927"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-8 text-[14px] font-medium text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.553 4.118 1.522 5.854L.057 23.885a.5.5 0 0 0 .608.658l6.228-1.634A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.511-5.193-1.403l-.372-.221-3.857 1.013 1.033-3.752-.242-.386A9.937 9.937 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  WhatsApp Us
                </a>
              </motion.div>

              {/* Bottom info strip */}
              <motion.div
                className="mt-14 border-t border-white/12 py-6 flex items-center justify-between"
                variants={fadeUp}
              >
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2 text-white/45 text-[13px]">
                    <svg className="h-3.5 w-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Kawthaung, Myanmar
                  </div>
                  <div className="flex items-center gap-2 text-white/45 text-[13px]">
                    <svg className="h-3.5 w-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    burmasailingtour@gmail.com
                  </div>
                </div>
                <p className="text-[12px] text-white/25 italic">
                  "One of Southeast Asia's last untouched cruising grounds."
                </p>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default HeroSection;
