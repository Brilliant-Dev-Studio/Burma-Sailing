import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, useScroll, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const seq = {
  hidden:  { opacity: 0, y: 14 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease, delay: d },
  }),
}

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
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

const CONTACT = {
  email:     'info@burmasailing.com',
  whatsapp:  '+95912345678',
  viber:     '+95912345678',
  facebook:  'https://facebook.com/burmasailing',
  instagram: 'https://instagram.com/burmasailing',
  tiktok:    'https://tiktok.com/@burmasailing',
}

const directContacts = [
  {
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    color: '#0a0a0a',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: CONTACT.whatsapp,
    href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`,
    color: '#25D366',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.827L.057 23.214a.75.75 0 0 0 .93.93l5.456-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.499-5.24-1.37l-.376-.214-3.892 1.046 1.065-3.787-.233-.39A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    ),
  },
  {
    label: 'Viber',
    value: CONTACT.viber,
    href: `viber://chat?number=${CONTACT.viber.replace(/\D/g, '')}`,
    color: '#7360F2',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.4 0C6.6.2 2.6 3.3 1.5 7.9c-.4 1.7-.4 3.3-.1 5 .8 4.5 4.3 8 8.8 8.8.5.1 1 .1 1.6.1v2.4c0 .3.4.5.6.2l2.9-3.1c2.7-.6 5.1-2.3 6.4-4.8 1.8-3.2 1.7-7.2-.1-10.3C20 3.3 17.1 1.2 13.8.3 13 .1 12.2 0 11.4 0zm.2 2c.7 0 1.3.1 2 .2 2.8.7 5.2 2.5 6.5 5.1 1.5 2.6 1.6 5.9.1 8.6-1.1 2.1-3.1 3.6-5.4 4.2l-.3.1-2.1 2.2v-1.8c-.5 0-1 0-1.5-.1-3.9-.7-7-3.8-7.6-7.7-.3-1.5-.2-3 .1-4.4.9-3.9 4.3-6.4 8.2-6.4z"/>
        <path d="M14.6 15.6c-.4 0-.8-.1-1.2-.2-3.2-1-5.8-3.6-6.8-6.8-.3-1-.2-2 .4-2.7l.5-.6c.5-.6 1.4-.6 1.9 0l1.5 1.9c.4.5.4 1.3-.1 1.8l-.4.4c-.1.1-.1.3 0 .4.5 1.1 1.4 2 2.5 2.5.1.1.3 0 .4 0l.4-.4c.5-.5 1.3-.5 1.8-.1l1.9 1.5c.6.5.6 1.4 0 1.9l-.6.5c-.6.5-1.4.9-2.2.9z"/>
      </svg>
    ),
  },
]

const socialLinks = [
  {
    label: 'Facebook',
    handle: '@burmasailing',
    href: CONTACT.facebook,
    bg: '#1877F2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    handle: '@burmasailing',
    href: CONTACT.instagram,
    bg: 'linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    handle: '@burmasailing',
    href: CONTACT.tiktok,
    bg: '#010101',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const bannerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: bannerScroll } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start'],
  })
  const bannerImgY = useTransform(bannerScroll, [0, 1], [-50, 50])

  return (
    <motion.div
      variants={pageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
    >
      <Helmet>
        <title>Burma Sailing | Contact Us</title>
        <meta name="description" content="Get in touch with Burma Sailing — email, WhatsApp, Viber, and social media. Based in Kawthaung, Myanmar. We help plan your voyage into the Mergui Archipelago." />
        <meta name="keywords" content="contact Burma Sailing, Burma Sailing WhatsApp, Kawthaung yacht agent contact, Myanmar sailing enquiry" />
        <meta property="og:title" content="Burma Sailing | Contact Us" />
        <meta property="og:description" content="Let us help you plan your voyage into Myanmar's hidden islands. Reach us via email, WhatsApp, or Viber." />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* ── Header + Contact Cards (sequential cascade) ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="px-3 md:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-screen-xl">

          {/* lg: 2-column — heading left, cards right */}
          <div className="lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-20 lg:items-start">

            {/* Left — heading */}
            <div className="pt-8 md:pt-10 pb-10 lg:pb-0 lg:sticky lg:top-[100px]">
              <motion.p
                custom={0.05}
                variants={seq}
                className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-400"
              >
                Contact Us
              </motion.p>
              <motion.h1
                custom={0.18}
                variants={seq}
                className="mt-3 text-[38px] md:text-[52px] lg:text-[58px] font-[600] leading-tight text-slate-900"
              >
                Get in touch.
              </motion.h1>
              <motion.p
                custom={0.30}
                variants={seq}
                className="mt-4 text-[15px] md:text-[16px] text-slate-500 max-w-[44ch] leading-relaxed"
              >
                Tell us about your voyage and we'll take care of the rest.
                Reach us through any channel below — we respond quickly.
              </motion.p>

              {/* Quick WhatsApp CTA — visible on lg only */}
              <motion.a
                custom={0.42}
                variants={seq}
                href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 hidden lg:inline-flex h-12 items-center gap-2 rounded-full bg-black px-8 text-[14px] font-semibold text-white hover:bg-black/85 transition-colors"
              >
                Message on WhatsApp
              </motion.a>
            </div>

            {/* Right — cards */}
            <div className="pt-0 lg:pt-10">
              {/* Direct Contact */}
              <div>
                <motion.p
                  custom={0.44}
                  variants={seq}
                  className="uppercase text-[12px] font-semibold tracking-[0.18em] text-slate-400 mb-4"
                >
                  Direct Contact
                </motion.p>
                <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3 lg:flex lg:flex-col">
                  {directContacts.map((c, i) => (
                    <motion.a
                      key={c.label}
                      custom={0.56 + i * 0.13}
                      variants={seq}
                      href={c.href}
                      target={c.label !== 'Email' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-black/8 bg-white p-5 transition-shadow duration-300 hover:shadow-md"
                    >
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-400">{c.label}</p>
                        <p className="mt-0.5 text-[14px] font-medium text-slate-800 truncate">{c.value}</p>
                      </div>
                      <svg className="ml-auto shrink-0 text-slate-300 transition-colors duration-300 group-hover:text-slate-600" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 md:mt-10">
                <motion.p
                  custom={0.96}
                  variants={seq}
                  className="uppercase text-[12px] font-semibold tracking-[0.18em] text-slate-400 mb-4"
                >
                  Follow Us
                </motion.p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-3">
                  {socialLinks.map((s, i) => (
                    <motion.a
                      key={s.label}
                      custom={1.08 + i * 0.13}
                      variants={seq}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-black/8 bg-white p-5 transition-shadow duration-300 hover:shadow-md"
                    >
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
                        style={{ background: s.bg }}
                      >
                        {s.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-400">{s.label}</p>
                        <p className="mt-0.5 text-[14px] font-medium text-slate-800 truncate">{s.handle}</p>
                      </div>
                      <svg className="ml-auto shrink-0 text-slate-300 transition-colors duration-300 group-hover:text-slate-600" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* ── Image + CTA Banner ── */}
      <section className="mt-12 md:mt-16 px-3 md:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            ref={bannerRef}
            className="relative overflow-hidden rounded-2xl h-[340px] md:h-[420px] lg:h-[500px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            {/* Parallax image */}
            <motion.div
              className="absolute inset-x-0 will-change-transform"
              style={{ y: bannerImgY, top: -70, bottom: -70 }}
            >
              <img
                src="/IMG_2674.JPG"
                alt="Mergui Archipelago hidden islands"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 lg:px-16">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/50 font-semibold">Burma Sailing</p>
              <h2 className="mt-3 text-[24px] md:text-[32px] lg:text-[40px] font-[600] leading-snug text-white max-w-[20ch]">
                Let us help you plan your voyage into Myanmar's hidden islands.
              </h2>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-fit h-11 md:h-12 items-center gap-2 rounded-full bg-white px-7 text-[14px] md:text-[15px] font-semibold text-black hover:bg-white/90 transition-colors"
              >
                Message us now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Our Location ── */}
      <motion.section
        className="px-3 md:px-6 lg:px-8 mt-16 md:mt-20 pb-16 md:pb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger(0.1, 0)}
      >
        <div className="mx-auto max-w-screen-xl">

          {/* Header row */}
          <motion.div
            className="border-t border-black/10 pt-10 pb-8 md:flex md:gap-16 md:items-end"
            variants={fadeUp}
          >
            <p className="shrink-0 text-[13px] font-semibold uppercase tracking-[0.18em] text-slate-400 md:w-[160px] mb-5 md:mb-0">
              Our Location
            </p>
            <div className="flex-1">
              <h2 className="text-[30px] md:text-[40px] lg:text-[48px] font-[600] leading-tight text-slate-900">
                Kawthaung, Myanmar
              </h2>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-10">
                <p className="text-[15px] text-slate-500">
                  <span className="text-slate-400 text-[12px] uppercase tracking-wider font-medium mr-2">Base</span>
                  Kawthaung, Tanintharyi Region
                </p>
                <p className="text-[15px] text-slate-500">
                  <span className="text-slate-400 text-[12px] uppercase tracking-wider font-medium mr-2">Area</span>
                  Mergui Archipelago, Southern Myanmar
                </p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Kawthaung,Myanmar"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 md:mt-0 shrink-0 inline-flex h-10 items-center gap-1.5 text-[14px] font-medium text-slate-700 hover:text-black transition-colors group"
            >
              Open in Google Maps
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </motion.div>

          <motion.div className="border-t border-black/10" variants={fadeUp} />

          {/* Map */}
          <motion.div
            className="mt-6 relative overflow-hidden rounded-2xl h-[380px] md:h-[500px] lg:h-[600px]"
            variants={fadeUp}
          >
            <iframe
              title="Burma Sailing — Kawthaung, Myanmar"
              src="https://maps.google.com/maps?q=Kawthaung,Myanmar&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://maps.google.com/?q=Kawthaung,Myanmar"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-semibold text-black shadow-lg hover:bg-white/90 transition-colors"
            >
              ↗ View larger map
            </a>
          </motion.div>

        </div>
      </motion.section>
    </motion.div>
  )
}
