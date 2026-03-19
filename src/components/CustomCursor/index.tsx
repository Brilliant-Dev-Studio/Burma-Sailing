import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor — laptop (pointer: fine, lg+) only.
 *
 * Two layers, both trail behind the real pointer:
 *  • Small dot  — fast spring  (tight chase)
 *  • Outer ring — slow spring  (relaxed chase, more visible lag)
 */
export default function CustomCursor() {
  const [visible, setVisible]   = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  // Raw mouse coords
  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)

  // Dot  — medium lag
  const dotX = useSpring(mx, { stiffness: 140, damping: 16, mass: 0.6 })
  const dotY = useSpring(my, { stiffness: 140, damping: 16, mass: 0.6 })

  // Ring — slower, more visible trail
  const ringX = useSpring(mx, { stiffness: 70, damping: 14, mass: 0.8 })
  const ringY = useSpring(my, { stiffness: 70, damping: 14, mass: 0.8 })

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)')
    if (!mq.matches) return

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)
    }

    const onLeave  = () => setVisible(false)
    const onEnter  = () => setVisible(true)
    const onDown   = () => setClicking(true)
    const onUp     = () => setClicking(false)

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, label, textarea, select, [data-cursor-hover]'
      )
      setHovering(!!el)
    }

    window.addEventListener('mousemove',  onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener('mouseover',  onOver)
    window.addEventListener('mousedown',  onDown)
    window.addEventListener('mouseup',    onUp)

    return () => {
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mouseover',  onOver)
      window.removeEventListener('mousedown',  onDown)
      window.removeEventListener('mouseup',    onUp)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Don't mount on touch / small screens
  if (typeof window !== 'undefined') {
    if (!window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) {
      return null
    }
  }

  if (!visible) return null

  return (
    <>
      {/* ── Outer ring — slower trail ── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width:           hovering ? 52 : clicking ? 22 : 38,
          height:          hovering ? 52 : clicking ? 22 : 38,
          backgroundColor: hovering ? 'rgba(255,255,255,0.15)' : 'transparent',
          borderWidth:     hovering ? 1.5 : 1,
          borderColor:     'rgba(255,255,255,0.85)',
        }}
        initial={{ width: 38, height: 38 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* ── Inner dot — fast trail ── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-white mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width:   hovering ? 5  : clicking ? 14 : 8,
          height:  hovering ? 5  : clicking ? 14 : 8,
          opacity: hovering ? 0.5 : 1,
        }}
        initial={{ width: 8, height: 8, opacity: 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  )
}
