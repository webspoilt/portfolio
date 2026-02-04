'use client'

import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'

interface GlowCardProps {
  children: ReactNode
  gradient: string
  className?: string
}

export default function GlowCard({ children, gradient, className = '' }: GlowCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      {/* Glow effect that follows cursor */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            background: `radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)`
          }}
        />
      )}

      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`}
      />

      {/* Border glow on hover */}
      <motion.div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 blur-md transition-opacity duration-500`}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
      />

      {/* Card content */}
      <div className="relative z-10 bg-gradient-to-br from-slate-900/90 to-black/90 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 rounded-3xl p-8 md:p-12">
        {children}
      </div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
        initial={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'linear'
          }}
        />
      </motion.div>
    </motion.div>
  )
}
