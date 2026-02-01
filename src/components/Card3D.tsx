'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode } from 'react'

interface Card3DProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export default function Card3D({ children, className = '', intensity = 20 }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 400, damping: 28 })
  const mouseY = useSpring(y, { stiffness: 400, damping: 28 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity])

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isMobile) return // Skip 3D effect on mobile
    
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = (e.clientX - rect.left) / width - 0.5
    const mouseY = (e.clientY - rect.top) / height - 0.5
    
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: isMobile ? 0 : rotateX.get(),
        rotateY: isMobile ? 0 : rotateY.get(),
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.01 }}
      animate={{
        boxShadow: isHovered && !isMobile 
          ? '0 20px 40px -10px rgba(139, 92, 246, 0.3)' 
          : '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
      }}
      transition={{
        boxShadow: { duration: 0.25 },
      }}
    >
      {children}
    </motion.div>
  )
}
