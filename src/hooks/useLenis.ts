import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Initialises Lenis smooth scroll only on pointer-fine (mouse) + lg+ screens.
 * On mobile / tablet the native scroll is left untouched.
 */
export function useLenis() {
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)')
    if (!mq.matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Keep framer-motion scroll hooks aware of Lenis position
    lenis.on('scroll', () => {
      window.dispatchEvent(new Event('scroll', { bubbles: false }))
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
}
