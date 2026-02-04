'use client'

import { motion } from 'framer-motion'
import { Shield, Code2, Terminal, Cpu } from 'lucide-react'

export default function WebspoiltLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3"
    >
      {/* Animated Logo Mark */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative w-10 h-10"
      >
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Shield Background */}
          <motion.path
            d="M20 2L4 10V20C4 28 20 38 20 38C20 38 36 28 36 20V10L20 2Z"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="2"
            filter="url(#glow)"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Code Brackets Inside Shield */}
          <text
            x="20"
            y="26"
            textAnchor="middle"
            fill="url(#logoGradient)"
            fontSize="14"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {'<W/>'}
          </text>
          
          {/* Orbiting Dots */}
          <motion.circle
            cx="20"
            cy="6"
            r="2"
            fill="#ec4899"
            animate={{
              cx: [20, 34, 20, 6, 20],
              cy: [6, 20, 34, 20, 6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.circle
            cx="20"
            cy="34"
            r="1.5"
            fill="#8b5cf6"
            animate={{
              cx: [20, 6, 20, 34, 20],
              cy: [34, 20, 6, 20, 34],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
        </svg>
      </motion.div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <motion.span
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient"
          whileHover={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 2 }}
        >
          webspoilt
        </motion.span>
        <motion.span
          className="text-xs text-purple-400/70"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Secure. Scalable. Smart.
        </motion.span>
      </div>
    </motion.div>
  )
}
