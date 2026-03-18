import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const previewImages = [
    { src: "/IMG_2668.JPG", alt: "Interior preview 1" },
    { src: "/IMG_2669.JPG", alt: "Interior preview 2" },
    { src: "/IMG_2670.JPG", alt: "Interior preview 3" },
    { src: "/IMG_2671.JPG", alt: "Interior preview 4" },
  ];

  const faqs = useMemo(
    () => [
      {
        title: "What’s included in a charter?",
        description:
          "Your charter typically includes the yacht, crew, standard equipment, and a tailored itinerary. Optional add-ons (like premium catering or special activities) can be arranged.",
      },
      {
        title: "How far in advance should I book?",
        description:
          "We recommend booking 2–6 weeks in advance for best availability. Peak seasons and larger groups may need more lead time.",
      },
      {
        title: "Is it safe for families and first-time sailors?",
        description:
          "Yes. Safety is our priority—vessels are checked and supported by experienced staff. We can tailor routes and pace for families and beginners.",
      },
      {
        title: "What happens if the weather changes?",
        description:
          "If conditions shift, our team adjusts the route for comfort and safety. We’ll always communicate options clearly and keep the experience smooth.",
      },
    ],
    [],
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  /** One easing + duration family so everything feels coordinated */
  const ease = [0.22, 1, 0.36, 1] as const;
  const dur = 0.48;

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur, ease },
    },
  };

  const stagger = (gap: number, delayChildren = 0) => ({
    hidden: {},
    visible: {
      transition: { staggerChildren: gap, delayChildren },
    },
  });

  /** Gallery tiles: one motion per card; order follows DOM (1 → 2 → 3 → 4) */
  const galleryItem = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.52, ease },
    },
  };

  return (
    <div>
      {/* Hero Video */}
      <div className="h-[84svh] rounded-b-[4px] overflow-hidden relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onError={() => {
            // eslint-disable-next-line no-console
            console.error(
              "Hero video failed to load. Expected at /videos/hero.mp4",
            );
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <motion.div
          className="absolute bottom-[50px] left-[3%] text-white"
          initial="hidden"
          animate="visible"
          variants={stagger(0.14, 0.08)}
        >
          <motion.p className="mb-3 text-sm" variants={fadeUp}>
            Burma Sailing
          </motion.p>
          <motion.p className="text-2xl" variants={fadeUp}>
            Your Trusted Passage to the Mergui Archupelag and Yacht Agent
            Expedition Specialist In the Mergui Archipelago
          </motion.p>
          <motion.button
            className="mt-8 rounded-full bg-white px-8 py-3 text-md font-semibold text-black"
            variants={fadeUp}
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>

      {/* About Us */}
      <section className="mt-[110px] px-3">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger(0.11, 0)}
        >
          <motion.p className="uppercase text-[16px] font-medium text-[#333333]" variants={fadeUp}>
            Effortless • Adventurous • Premium
          </motion.p>
          <motion.p className="mt-[20px] text-[34px] font-[500]" variants={fadeUp}>
            Empowering seamless exploration through expert local logistics and
            deep regional knowledge.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-[30px]">
            <button className="h-[48px] w-[127px] rounded-full bg-black text-[16px] font-medium text-white">
              About Us
            </button>
          </motion.div>
          <motion.p className="mt-[30px] text-[#353b48]" variants={fadeUp}>
            Burma Sailing is a dedicated yacht agency specializing in supporting
            visiting sailing yachts and expedition vessels cruising the
            extraodinary water of the Mergui Archipelago in southern Myanmar. With
            deep local knowledge and years on experience, we act as the vital link
            between international sailors and one of southeast Asia's most remote
            and unspoiled cruising destinations.
          </motion.p>
        </motion.div>
        <div className="relative mt-[30px] h-[388px] w-full overflow-hidden rounded-md">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-[388px] w-full object-cover"
            onError={() => {
              // eslint-disable-next-line no-console
              console.error(
                "Hero video failed to load. Expected at /videos/hero.mp4",
              );
            }}
          >
            <source src="/videos/aboutus.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="absolute bottom-[30px] left-[3%] right-[2%] text-white">
            Sailing in this region is not like cruising in mainstream
            destination. It requires trusted local experties, careful
            coodination, and an understanding both the sea and the system
            ashore.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="mt-[110px] px-3">
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
              className="mt-3 text-[34px] font-[600] leading-tight text-slate-900"
              variants={fadeUp}
            >
              A glimpse of life onboard.
            </motion.p>
            <motion.p
              className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-slate-600"
              variants={fadeUp}
            >
              Explore interiors, island moments, and the kind of quiet luxury
              you only get at sea.
            </motion.p>
          </div>
          <motion.a
            href="/gallery"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-black px-6 text-[15px] font-semibold text-white transition-colors hover:bg-black/90"
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
            const tileClass =
              idx === 0
                ? "col-span-2 md:col-span-7 md:row-span-2"
                : idx === 1
                  ? "col-span-1 md:col-span-5"
                  : idx === 2
                    ? "col-span-1 md:col-span-3"
                    : "col-span-2 md:col-span-9";

            const heightClass =
              idx === 0
                ? "h-[320px] md:h-[460px]"
                : idx === 1
                  ? "h-[150px] md:h-[220px]"
                  : idx === 2
                    ? "h-[150px] md:h-[220px]"
                    : "h-[180px] md:h-[220px]";

            const caption =
              idx === 0
                ? "Interiors & Details"
                : idx === 1
                  ? "Deck Moments"
                  : idx === 2
                    ? "Island Light"
                    : "Journeys & Memories";

            return (
              <motion.a
                key={`${img.src}-${idx}`}
                href="/gallery"
                className={[
                  "group relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm",
                  "transition-shadow duration-300 hover:-translate-y-0.5 hover:shadow-md",
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
                    <p className="text-[15px] font-semibold text-white">{caption}</p>
                    <p className="mt-1 text-[13px] text-white/80">Open gallery</p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </section>

      {/* Services banner */}
      <section className="mt-[110px] pb-10 px-3">
        <motion.div
          className="relative h-[500px] w-full overflow-hidden rounded-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
        >
          <img
            src="/IMG_2672.JPG"
            alt="Interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />
          <div className="absolute top-[30px] left-[3%] right-[6%] text-white">
            <p className="uppercase text-[13px] font-semibold">Interior</p>
            <p className="mt-3 text-[30px] leading-snug">
              Local Knowledge. Professional Support. Authentic Access
            </p>
          </div>
          <a
            href="/gallery"
            className="absolute bottom-[30px] left-[3%] inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-white px-6 text-[15px] font-semibold text-black"
          >
            Explore Our Services
          </a>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="mt-[110px] px-3 pb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={stagger(0.1, 0)}
        >
          <motion.p
            className="uppercase text-[13px] font-semibold tracking-[0.18em] text-slate-500"
            variants={fadeUp}
          >
            FAQ
          </motion.p>
          <motion.h2
            className="mt-3 text-[34px] font-[600] leading-tight text-slate-900"
            variants={fadeUp}
          >
            We deliver exceptional experiences on the water.
          </motion.h2>
          <motion.p
            className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-slate-600"
            variants={fadeUp}
          >
            Our values shape every journey, every interaction, and every detail we
            design.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 divide-y divide-black/10 rounded-md border border-black/10 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={stagger(0.09, 0.08)}
        >
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <motion.div key={faq.title} className="px-5 py-5" variants={fadeUp}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() =>
                    setOpenFaqIndex((v) => (v === idx ? null : idx))
                  }
                  aria-expanded={isOpen}
                >
                  <span className="text-[20px] font-semibold text-slate-900">
                    {faq.title}
                  </span>
                  <span
                    className={[
                      "grid h-10 w-10 place-items-center rounded-full border border-black text-black",
                      "transition-transform duration-200",
                      isOpen ? "rotate-45" : "rotate-0",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={[
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <p className="mt-3 text-[16px] leading-relaxed text-slate-600">
                      {faq.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Final CTA banner */}
      <section className="mt-[80px] px-3 pb-10">
        <motion.div
          className="relative h-[550px] w-full overflow-hidden rounded-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <img
            src="/IMG_2675.JPG"
            alt="Interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute top-[30px] left-[3%] right-[6%] text-white">
            <p className="uppercase text-[13px] font-semibold">
              Ready to Make Waves?
            </p>
            <p className="mt-3 text-[30px] leading-snug">
              Your perfect day on the water is just a few clicks away.
            </p>
          </div>
          <a
            href="/gallery"
            className="absolute bottom-[30px] left-[3%] inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-white px-6 text-[15px] font-semibold text-black"
          >
            Contact Us Now
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default HeroSection;
