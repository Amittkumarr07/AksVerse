import type { MotionProps } from 'framer-motion'

/**
 * Scroll-reveal animation: an element fades in and slides up the first time
 * it scrolls into view. Spread it onto any motion element:
 *
 *   <motion.section {...reveal()}>        // no delay
 *   <motion.div {...reveal(0.1)}>         // 0.1s delay (useful for staggering)
 *
 * Users who prefer reduced motion automatically get no movement
 * (see <MotionConfig reducedMotion="user"> in App.tsx).
 */
export const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})
