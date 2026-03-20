import { Facebook, Instagram } from "lucide-react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="mt-16 ">
      <div className="mx-auto  pt-10 pb-5 border-t w-full px-3 lg:px-10  bg-slate-100 ">
        <div className="grid  gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="/" className="group inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 shadow-sm ring-1 ring-black/5">
                <img
                  src={logo}
                  alt="Burma Sailing"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white/90"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-[16px] font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-slate-800">
                  Burma Sailing
                </span>
                <span className="block text-[12px] font-medium text-slate-500">
                  Sailing & Adventures
                </span>
              </span>
            </a>

            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-slate-600">
              Premium yacht agency support for the Mergui Archipelago—local
              knowledge, professional coordination, authentic access.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://facebook.com/burmasailing"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black text-black transition-colors hover:bg-black hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/burmasailing"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black text-black transition-colors hover:bg-black hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com/@burmasailing"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black text-black transition-colors hover:bg-black hover:text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M14 3v10.2a4.3 4.3 0 1 1-3-4.12V6.1a7.3 7.3 0 1 0 6 7.18V8.2c1.4 1.02 3.06 1.66 5 1.82V7.1c-2.7-.2-4.7-2.02-5-4.1H14Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-[13px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
                  Menu
                </p>
                <nav className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px] font-medium text-slate-900">
                  <a className="block w-fit hover:underline" href="/">
                    Home
                  </a>
                  <a className="block w-fit hover:underline" href="/about">
                    About
                  </a>
                  <a className="block w-fit hover:underline" href="/services">
                    Services
                  </a>
                  <a
                    className="block w-fit hover:underline"
                    href="/charter-packages"
                  >
                    Charter & Packages
                  </a>
                  <a
                    className="block w-fit hover:underline"
                    href="/destinations"
                  >
                    Destinations
                  </a>
                  <a className="block w-fit hover:underline" href="/gallery">
                    Gallery
                  </a>
                  <a className="block w-fit hover:underline" href="/contact">
                    Contact
                  </a>
                </nav>
              </div>

              <div>
                <p className="text-[13px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
                  Contact
                </p>
                <div className="mt-4 space-y-3 text-[15px] text-slate-600">
                  <p>Kawthaung, Myanmar • Mergui Archipelago</p>
                  <a
                    className="block w-fit font-medium text-slate-900 hover:underline"
                    href="mailto:info@burmasailing.com"
                  >
                    info@burmasailing.com
                  </a>
                  <a
                    className="block w-fit font-medium text-slate-900 hover:underline"
                    href="https://wa.me/95912345678"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp / Viber: +95 912 345 678
                  </a>

                  <a
                    href="/contact"
                    className="mt-4 inline-flex h-11 items-center justify-center rounded-full border border-black bg-white px-6 text-[15px] font-semibold text-black transition-colors hover:bg-black hover:text-white"
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-6 text-[13px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Burma Sailing. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a className="hover:underline" href="/privacy">
              Privacy
            </a>
            <a className="hover:underline" href="/terms">
              Terms
            </a>
          </div>
        </div>

        {/* Powered by */}
        <div className="mt-5 flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity duration-300">
          <a
            href="https://brilliantdevstudio.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <span className="text-[11px] tracking-widest uppercase text-slate-400">Powered by</span>
            <img
              src="/powerby.png"
              alt="Brilliant Dev Studio"
              className="h-[18px] w-auto grayscale"
              draggable={false}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
