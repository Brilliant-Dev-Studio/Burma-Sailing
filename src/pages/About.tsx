import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, useScroll, useTransform } from 'framer-motion'

const pageMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -12 },
}

const ease = [0.22, 1, 0.36, 1] as const
const dur  = 0.48

const fadeUp = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: dur, ease } },
}

const stagger = (gap: number, delayChildren = 0) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: gap, delayChildren } },
})

const stripImages = [
  { src: '/IMG_2671.JPG', caption: 'Island Anchorage' },
  { src: '/interiro.jpg', caption: 'On Deck' },
  { src: '/IMG_2674.JPG', caption: 'Remote Waters' },
  { src: '/IMG_2668.JPG', caption: 'Crew Life' },
]

const services = [
  { n: '01', title: 'Cruising Permits & Pre-arrival Coordination' },
  { n: '02', title: 'Licensed Guides & Regulatory Compliance' },
  { n: '03', title: 'Immigration, Customs & Port Clearance' },
  { n: '04', title: 'Itinerary Planning for Remote Island Cruising' },
  { n: '05', title: 'Local Logistics & Provisioning Support' },
  { n: '06', title: 'Liaison with Authorities & Communities' },
  { n: '07', title: 'Practical Solutions Tailored to Each Yacht' },
]

export default function About() {
  const mergуiRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: merguiScroll } = useScroll({
    target: mergуiRef,
    offset: ['start end', 'end start'],
  })
  const merguiY = useTransform(merguiScroll, [0, 1], [-50, 50])

  return (
    <motion.section
      variants={pageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
    >
      <Helmet>
        <title>Burma Sailing | About Us</title>
        <meta name="description" content="Learn about Burma Sailing — a licensed yacht agency based in Kawthaung, specialising in sailing permits, logistics, and local guidance for the Mergui Archipelago." />
        <meta name="keywords" content="about Burma Sailing, yacht agent Kawthaung, Mergui Archipelago sailing, Myanmar yacht services" />
        <meta property="og:title" content="Burma Sailing | About Us" />
        <meta property="og:description" content="Your trusted local partner for sailing the Mergui Archipelago. Deep regional knowledge, professional support." />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* ── Hero Video ── */}
      <div className="h-[84svh] rounded-b-[4px] overflow-hidden relative">
        <video
          autoPlay muted loop playsInline preload="auto"
          className="w-full h-full object-cover"
          onError={() => console.error('About hero video failed to load.')}
        >
          <source src="/videos/aboutus.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        <motion.div
          className="absolute bottom-[50px] left-[4%] md:left-[6%] lg:left-[8%] text-white max-w-[90%] md:max-w-[60%] lg:max-w-[50%]"
          initial="hidden"
          animate="visible"
          variants={stagger(0.14, 0.08)}
        >
          <motion.p className="mb-3 text-sm tracking-wide" variants={fadeUp}>
            Burma Sailing
          </motion.p>
          <motion.p
            className="text-[24px] md:text-[34px] lg:text-[42px] font-[500] leading-snug"
            variants={fadeUp}
          >
            Your Trusted Passage to the Mergui Archipelago and Yacht Agent
            Expedition Specialist In the Mergui Archipelago
          </motion.p>
          <motion.a
            href="/contact"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-8 text-[14px] md:text-[15px] font-semibold text-black hover:bg-white/90 transition-colors"
            variants={fadeUp}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>

      {/* ── About Us intro ── */}
      <section className="mt-[80px] md:mt-[100px] px-3 md:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            className="lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger(0.11, 0)}
          >
            <motion.div variants={fadeUp}>
              <p className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-400">
                About Us
              </p>
              <h2 className="mt-3 text-[30px] md:text-[38px] lg:text-[46px] font-[500] leading-tight text-slate-900">
                Dedicated yacht agency supporting visiting sailing yachts in
                the Mergui Archipelago.
              </h2>
            </motion.div>
            <motion.p
              className="mt-5 lg:mt-0 text-[15px] md:text-[16px] leading-relaxed text-slate-600"
              variants={fadeUp}
            >
              Burma Sailing is a dedicated yacht agency specializing in supporting
              visiting sailing yachts and expedition vessels cruising the
              extraordinary waters of the Mergui Archipelago in southern Myanmar.
              With deep local knowledge and years of experience, we act as the
              vital link between international sailors and one of Southeast Asia's
              most remote and unspoiled cruising destinations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Image banner ── */}
      <section className="mt-[60px] md:mt-[80px] px-3 md:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            ref={mergуiRef}
            className="relative h-[300px] md:h-[420px] lg:h-[500px] overflow-hidden rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            {/* Parallax image */}
            <motion.div
              className="absolute inset-x-0 will-change-transform"
              style={{ y: merguiY, top: -70, bottom: -70 }}
            >
              <img
                src="/IMG_2672.JPG"
                alt="Mergui Archipelago sailing"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
            <div className="absolute bottom-8 md:bottom-10 left-6 md:left-10 right-6 text-white">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-semibold">
                Mergui Archipelago
              </p>
              <p className="mt-2 text-[18px] md:text-[24px] lg:text-[28px] font-semibold leading-snug max-w-[36ch]">
                Sailing in this region is not like cruising in mainstream destinations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="mt-[80px] md:mt-[100px] px-3 md:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger(0.12, 0)}
          >
            {/* Mission */}
            <motion.div
              className="border-t border-black/10 pt-10 pb-12 md:flex md:gap-16 lg:gap-24"
              variants={fadeUp}
            >
              <p className="shrink-0 text-[13px] font-semibold uppercase tracking-[0.18em] text-slate-400 md:w-[140px] lg:w-[160px] mb-5 md:mb-0 md:pt-1">
                Our Mission
              </p>
              <p className="text-[24px] md:text-[30px] lg:text-[34px] font-[500] leading-snug text-slate-900 max-w-[36ch]">
                To deliver seamless support to visiting yachts through expert guidance — enabling sailors to experience remote cruising with professionalism, safety, and deep regional knowledge.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              className="border-t border-black/10 pt-10 pb-12 md:flex md:gap-16 lg:gap-24"
              variants={fadeUp}
            >
              <p className="shrink-0 text-[13px] font-semibold uppercase tracking-[0.18em] text-slate-400 md:w-[140px] lg:w-[160px] mb-5 md:mb-0 md:pt-1">
                Our Vision
              </p>
              <p className="text-[24px] md:text-[30px] lg:text-[34px] font-[500] leading-snug text-slate-900 max-w-[36ch]">
                To be the trusted gateway for sailors seeking authentic, remote, and responsible exploration of the Mergui Archipelago — connecting the world's yachting community to one of Southeast Asia's last untouched cruising grounds.
              </p>
            </motion.div>

            <motion.div className="border-t border-black/10" variants={fadeUp} />
          </motion.div>
        </div>
      </section>

      {/* ── Masonry image grid ── */}
      <motion.div
        className="mt-[60px] md:mt-[80px] px-3 md:px-6 lg:px-8 grid grid-cols-3 gap-3 md:gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger(0.1, 0)}
      >
        <div className="mx-auto max-w-screen-xl w-full col-span-3 grid grid-cols-3 gap-3 md:gap-4">
          <motion.div
            className="col-span-1 row-span-2 overflow-hidden rounded-2xl h-[240px] md:h-[340px] lg:h-[420px]"
            variants={fadeUp}
          >
            <img src="/IMG_2668.JPG" alt="Sailing life 1"
              className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700 ease-out" />
          </motion.div>
          <motion.div
            className="col-span-2 overflow-hidden rounded-2xl h-[115px] md:h-[163px] lg:h-[202px]"
            variants={fadeUp}
          >
            <img src="/IMG_2675.JPG" alt="Sailing life 2"
              className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700 ease-out" />
          </motion.div>
          <motion.div
            className="col-span-1 overflow-hidden rounded-2xl h-[115px] md:h-[163px] lg:h-[202px]"
            variants={fadeUp}
          >
            <img src="/IMG_2669.JPG" alt="Sailing life 3"
              className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700 ease-out" />
          </motion.div>
          <motion.div
            className="col-span-1 overflow-hidden rounded-2xl h-[115px] md:h-[163px] lg:h-[202px]"
            variants={fadeUp}
          >
            <img src="/IMG_2670.JPG" alt="Sailing life 4"
              className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700 ease-out" />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Who We Are ── */}
      <section className="mt-[80px] md:mt-[100px] px-3 md:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl">
          <motion.div
            className="lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger(0.1, 0)}
          >
            <motion.div variants={fadeUp}>
              <p className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-500">
                Who We Are
              </p>
              <h2 className="mt-3 text-[30px] md:text-[38px] lg:text-[44px] font-[600] leading-tight text-slate-900">
                Licensed yacht agent, locally based at Kawthaung.
              </h2>
            </motion.div>
            <motion.p
              className="mt-4 lg:mt-0 text-[15px] md:text-[16px] leading-relaxed text-slate-600"
              variants={fadeUp}
            >
              We are a licensed yacht agent and locally based at Kawthaung. Our
              team is passionate about the sea, sailing, and the unique maritime
              heritage of this region. Burma Sailing was established to make
              access to the Mergui Archipelago smooth, compliant, and rewarding
              for foreign yachts navigating complex procedures and remote
              conditions. Our strength lies in combining professional yacht agency
              services with genuine local relationships, ensuring every voyage is
              both well-supported and authentically connected to the region.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Image strip — mobile: horizontal scroll / lg: 4-col grid ── */}
      <div className="mt-[60px] md:mt-[80px]">
        {/* Mobile / tablet scroll strip */}
        <motion.div
          className="lg:hidden flex gap-3 overflow-x-auto px-3 md:px-6 pb-1 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.1, 0)}
        >
          {stripImages.map(({ src, caption }) => (
            <motion.div
              key={src}
              className="relative shrink-0 overflow-hidden rounded-2xl"
              style={{ width: '72vw', maxWidth: '340px', height: '240px', scrollSnapAlign: 'start' }}
              variants={fadeUp}
            >
              <img src={src} alt={caption}
                className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700 ease-out"
                loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 text-[13px] font-semibold text-white">{caption}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Laptop 4-col grid */}
        <motion.div
          className="hidden lg:grid px-8 grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.1, 0)}
        >
          <div className="mx-auto max-w-screen-xl w-full col-span-4 grid grid-cols-4 gap-4">
            {stripImages.map(({ src, caption }) => (
              <motion.div
                key={src}
                className="relative overflow-hidden rounded-2xl h-[280px]"
                variants={fadeUp}
              >
                <img src={src} alt={caption}
                  className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700 ease-out"
                  loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 text-[13px] font-semibold text-white">{caption}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── What We Do ── */}
      <section className="mt-[80px] md:mt-[100px] px-3 md:px-6 lg:px-8 pb-[80px] md:pb-[100px]">
        <div className="mx-auto max-w-screen-xl">

          {/* Header row */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger(0.1, 0)}
            >
              <motion.p
                className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-400"
                variants={fadeUp}
              >
                What We Do
              </motion.p>
              <motion.h2
                className="mt-3 text-[30px] md:text-[38px] lg:text-[44px] font-[600] leading-tight text-slate-900 max-w-[18ch]"
                variants={fadeUp}
              >
                Complete assistance for yachts visiting Myanmar.
              </motion.h2>
            </motion.div>
            <motion.p
              className="text-[15px] md:text-[16px] leading-relaxed text-slate-500 max-w-[38ch] md:text-right"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              We provide end-to-end support so captains and crews can focus
              on what matters — the sea.
            </motion.p>
          </div>

          {/* Divider list */}
          <motion.div
            className="mt-10 border-t border-black/10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={stagger(0.07, 0.05)}
          >
            {services.map((item) => (
              <motion.div
                key={item.n}
                className="group flex items-center justify-between border-b border-black/10 py-5 md:py-6 cursor-default"
                variants={fadeUp}
              >
                <div className="flex items-baseline gap-5 md:gap-8">
                  <span className="text-[12px] tabular-nums text-slate-300 transition-colors duration-300 group-hover:text-slate-400 w-6 shrink-0">
                    {item.n}
                  </span>
                  <span className="text-[17px] md:text-[19px] lg:text-[21px] font-[500] text-slate-800 transition-colors duration-300 group-hover:text-black">
                    {item.title}
                  </span>
                </div>
                <span className="shrink-0 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-slate-400 text-[20px] leading-none">
                  →
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Closing CTA */}
          <motion.div
            className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            <p className="text-[15px] md:text-[16px] text-slate-500 max-w-[52ch]">
              Our goal is to remove the complexity so captains and crews can focus
              on safe navigation and meaningful exploration.
            </p>
            <a
              href="/contact"
              className="shrink-0 inline-flex h-12 items-center justify-center rounded-full bg-black px-8 text-[14px] md:text-[15px] font-semibold text-white transition-colors hover:bg-black/85"
            >
              Get in Touch
            </a>
          </motion.div>

        </div>
      </section>
    </motion.section>
  )
}
