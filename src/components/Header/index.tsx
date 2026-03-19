import { Menu, X, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'

const leftNav  = [
  { label: 'About',        href: '/about' },
  { label: 'Services',     href: '/services' },
]

const rightNav = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Gallery',      href: '/gallery' },
]

const allPages = [
  { label: 'Home',              href: '/',                  desc: 'Start here' },
  { label: 'About',             href: '/about',             desc: 'Who we are' },
  { label: 'Services',          href: '/services',          desc: 'What we offer' },
  { label: 'Destinations',      href: '/destinations',      desc: 'Mergui Archipelago' },
  { label: 'Gallery',           href: '/gallery',           desc: 'Photos & voyages' },
  { label: 'Contact',           href: '/contact',           desc: 'Get in touch' },
]

const Header = () => {
  const [isMenuOpen,     setIsMenuOpen]     = useState(false)
  const [dropdownOpen,   setDropdownOpen]   = useState(false)
  const shouldReduceMotion                  = useReducedMotion()
  const { pathname }                        = useLocation()
  const closeTimer                          = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const openDropdown  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setDropdownOpen(true) }
  const closeDropdown = () => { closeTimer.current = setTimeout(() => setDropdownOpen(false), 120) }

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false) }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKeyDown) }
  }, [isMenuOpen])

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const active = isActive(href)
    return (
      <a
        href={href}
        className={[
          'relative flex flex-col items-center gap-0.5 px-3 pb-1 pt-1.5 text-[13.5px] font-medium rounded-md transition-colors duration-150',
          active ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800',
        ].join(' ')}
      >
        {label}
        <span className="h-[5px] flex items-center justify-center">
          {active && (
            <motion.span
              layoutId="nav-dot"
              className="block h-[4px] w-[4px] rounded-full bg-black"
              transition={{ type: 'spring', stiffness: 500, damping: 38, mass: 0.5 }}
            />
          )}
        </span>
      </a>
    )
  }

  return (
    <>
      <div className="fixed left-2 right-2 z-50 bg-white pt-2">
        <header className="relative flex items-center justify-between rounded-[4px] border bg-white/70 px-[20px] py-[16px] lg:py-[20px] backdrop-blur supports-[backdrop-filter]:bg-white/50">

          {/* ── LEFT — Logo ── */}
          <a href="/" className="group flex items-center gap-2.5 shrink-0">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 shadow-sm ring-1 ring-black/5">
              <img src={logo} alt="Burma Sailing" className="h-8 w-8 rounded-full object-cover ring-2 ring-white/90" />
            </span>
            <span className="leading-tight">
              <span className="block text-[14.5px] font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-slate-700">
                Burma Sailing
              </span>
              <span className="block text-[11px] font-medium text-slate-400">Sailing & Adventures</span>
            </span>
          </a>

          {/* ── CENTER — Nav links (absolute centered) ── */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5">
            {[...leftNav, ...rightNav].map((item) => <NavLink key={item.href} {...item} />)}
          </nav>

          {/* ── RIGHT — nav + all pages dropdown + CTA / hamburger ── */}
          <div className="flex items-center gap-1">

            {/* All Pages dropdown trigger */}
            <div
              className="hidden lg:block relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button
                type="button"
                className={[
                  'flex items-center gap-1 px-3 py-1.5 text-[13.5px] font-medium rounded-md transition-colors duration-150',
                  dropdownOpen ? 'text-slate-900 bg-black/5' : 'text-slate-500 hover:text-slate-800 hover:bg-black/5',
                ].join(' ')}
              >
                All Pages
                <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-3.5 w-3.5" />
                </motion.span>
              </button>

              {/* Mega dropdown */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0,  scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-[calc(100%+10px)] w-[480px] rounded-2xl border border-black/8 bg-white/95 backdrop-blur shadow-xl shadow-black/10 p-5"
                  >
                    {/* Label */}
                    <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      All Pages
                    </p>

                    {/* Grid */}
                    <div className="grid grid-cols-3 gap-1">
                      {allPages.map((page) => {
                        const active = isActive(page.href)
                        return (
                          <a
                            key={page.href}
                            href={page.href}
                            onClick={() => setDropdownOpen(false)}
                            className={[
                              'group flex flex-col gap-0.5 rounded-xl px-3.5 py-3 transition-colors duration-150',
                              active
                                ? 'bg-black text-white'
                                : 'hover:bg-black/5',
                            ].join(' ')}
                          >
                            <span className={[
                              'text-[13.5px] font-semibold',
                              active ? 'text-white' : 'text-slate-800',
                            ].join(' ')}>
                              {page.label}
                            </span>
                            <span className={[
                              'text-[11.5px]',
                              active ? 'text-white/60' : 'text-slate-400',
                            ].join(' ')}>
                              {page.desc}
                            </span>
                          </a>
                        )
                      })}
                    </div>

                    {/* Bottom CTA strip */}
                    <div className="mt-4 pt-4 border-t border-black/6 flex items-center justify-between">
                      <p className="text-[12px] text-slate-400">Based in Kawthaung, Myanmar</p>
                      <a
                        href="/contact"
                        onClick={() => setDropdownOpen(false)}
                        className="inline-flex h-8 items-center gap-1.5 rounded-full bg-black px-4 text-[12px] font-semibold text-white hover:bg-black/85 transition-colors"
                      >
                        Contact Us →
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact CTA */}
            <a
              href="/contact"
              className="hidden lg:inline-flex h-9 items-center justify-center rounded-full bg-black px-5 text-[13px] font-semibold text-white hover:bg-black/85 transition-colors ml-1"
            >
              Contact Us
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </header>
      </div>

      {/* ── Mobile / Tablet dropdown menu ── */}
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            key="menu-overlay"
            className="fixed left-0 right-0 top-0 z-[40] h-[75svh] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute inset-0 bg-white shadow-xl rounded-b-[24px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: 'easeOut' }}
            />
            <motion.div
              className="relative mx-auto h-full max-w-md overflow-auto px-6 pt-[104px]"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.nav
                className="mt-10 space-y-6 text-[18px] font-medium text-slate-900"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: shouldReduceMotion ? {} : { staggerChildren: 0.04, delayChildren: 0.06 } },
                }}
              >
                {[...allPages].map((item) => {
                  const active = isActive(item.href)
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={[
                        'flex items-center justify-between gap-4 w-full transition-colors duration-150',
                        active ? 'text-slate-900' : 'text-slate-600 hover:text-slate-700',
                      ].join(' ')}
                      variants={{
                        hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
                        show:   shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <motion.span
                          layoutId="active-dot"
                          className="h-1.5 w-1.5 rounded-full bg-black shrink-0"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </motion.a>
                  )
                })}
              </motion.nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
