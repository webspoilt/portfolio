'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface BentoGridProps {
  children: ReactNode
  className?: string
}

interface BentoItemProps {
  children: ReactNode
  colSpan?: 1 | 2
  rowSpan?: 1 | 2
  className?: string
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export function BentoItem({ children, colSpan = 1, rowSpan = 1, className = '' }: BentoItemProps) {
  const colClass = colSpan === 2 ? 'md:col-span-2 lg:col-span-2' : ''
  const rowClass = rowSpan === 2 ? 'md:row-span-2' : ''

  return (
    <motion.div
      className={`relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900/90 to-black/90 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 p-6 ${colClass} ${rowClass} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500"
        whileHover={{ opacity: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'linear'
          }}
        />
      </motion.div>
    </motion.div>
  )
}
