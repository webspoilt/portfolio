'use client'

import { ReactNode, useRef, useEffect, useState } from 'react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'

interface InfiniteMovingCardsProps {
  children: ReactNode[]
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
}

export default function InfiniteMovingCards({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className = ''
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setContentWidth(containerRef.current.scrollWidth / 2)
    }
  }, [children])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        ref={containerRef}
        className="flex gap-6"
        animate={{
          x: direction === 'left' ? [-contentWidth, 0] : [0, -contentWidth]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
            ...(pauseOnHover && {
              hover: {
                duration: 0
              }
            })
          }
        }}
        style={{
          width: 'max-content'
        }}
      >
        {/* Original cards */}
        {children}

        {/* Duplicate cards for seamless loop */}
        {children}
      </motion.div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </div>
  )
}
