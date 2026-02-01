'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export default function MagneticButton({ children, className = '', strength = 0.5 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 120, damping: 15 }
  const mouseX = useSpring(x, springConfig)
  const mouseY = useSpring(y, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isMobile) return

    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    const mouseXPos = e.clientX - centerX
    const mouseYPos = e.clientY - centerY

    x.set(mouseXPos * strength)
    y.set(mouseYPos * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: isMobile ? 0 : mouseX,
        y: isMobile ? 0 : mouseY,
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ scale: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  )
}
