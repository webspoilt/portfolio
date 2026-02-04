'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  rotation: number
}

interface SparklesProps {
  className?: string
  count?: number
  color?: string
  minSize?: number
  maxSize?: number
}

export default function Sparkles({
  className = '',
  count = 50,
  color = '#8b5cf6',
  minSize = 2,
  maxSize = 6
}: SparklesProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const initialSparkles: Sparkle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      opacity: Math.random() * 0.8 + 0.2,
      rotation: Math.random() * 360
    }))

    setSparkles(initialSparkles)

    // Animate sparkles
    const interval = setInterval(() => {
      setSparkles(prev => prev.map(sparkle => ({
        ...sparkle,
        opacity: Math.random() * 0.8 + 0.2,
        rotation: sparkle.rotation + Math.random() * 20 - 10,
        y: (sparkle.y + Math.random() * 2 - 1 + 100) % 100
      })))
    }, 100)

    return () => clearInterval(interval)
  }, [count, minSize, maxSize])

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${color}`
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [sparkle.opacity, sparkle.opacity * 1.5, sparkle.opacity]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  )
}
