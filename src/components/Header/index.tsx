import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import logo from '../../assets/logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const navItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Charter & Packages', href: '/charter-packages' },
      { label: 'Destinations', href: '/destinations' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Contact', href: '/contact' },
    ],
    [],
  )

  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

  return (
    <>
      <div className="fixed left-2 right-2  z-50 bg-white pt-2">
        <header
          className={[
            'flex items-center justify-between',
            'rounded-[4px] border bg-white/70 px-[20px] py-[15px] backdrop-blur supports-[backdrop-filter]:bg-white/50',
          ].join(' ')}
        >
          <a href="/" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 shadow-sm ring-1 ring-black/5">
              <img
                src={logo}
                alt="Burma Sailing"
                className="h-9 w-9 rounded-full object-cover ring-2 ring-white/90"
              />
            </span>
            <span className="leading-tight">
              <span className="block text-[15px] font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-slate-800">
                Burma Sailing
              </span>
              <span className="block text-[12px] font-medium text-slate-500">Sailing & Adventures</span>
            </span>
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            key="menu-overlay"
            className="fixed left-0 right-0 top-0 z-[40] h-[60svh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: 'easeOut' }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-white shadow-xl rounded-b-[24px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: 'easeOut' }}
            />

            {/* Panel content */}
            <motion.div
              className="relative mx-auto h-full max-w-md overflow-auto px-6 pt-[104px]"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.nav
                className="mt-10 space-y-6 text-[18px] font-medium text-slate-900"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: shouldReduceMotion
                      ? {}
                      : { staggerChildren: 0.04, delayChildren: 0.06 },
                  },
                }}
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="block w-fit"
                    onClick={() => setIsMenuOpen(false)}
                    variants={{
                      hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
                      show: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.32,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.nav>

            
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header