'use client'

import { ReactNode, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CardSpotlightProps {
    children: ReactNode
    className?: string
    spotlightColor?: string
}

export default function CardSpotlight({ children, className = '', spotlightColor = 'rgba(139, 92, 246, 0.15)' }: CardSpotlightProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const cardRef = useRef<HTMLDivElement>(null)

    const mouseX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
    const mouseY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
        mouseX.set(x)
        mouseY.set(y)
    }

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.div
            ref={cardRef}
            className={`relative rounded-3xl overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            {isHovered && (
                <motion.div
                    className="absolute pointer-events-none rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        left: mouseX,
                        top: mouseY,
                        width: '600px',
                        height: '600px',
                        background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 60%)`,
                        transform: 'translate(-50%, -50%)'
                    }}
                    transition={{ duration: 0.1 }}
                />
            )}

            <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-purple-500/0"
                animate={{ borderColor: isHovered ? 'rgba(139, 92, 246, 0.5)' : 'rgba(139, 92, 246, 0)' }}
                transition={{ duration: 0.3 }}
            />

            <div className="relative z-10 bg-gradient-to-br from-slate-900/95 to-black/95 backdrop-blur-xl rounded-3xl p-8 md:p-12">
                {children}
            </div>

            {isHovered && (
                <motion.div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />
                </motion.div>
            )}
        </motion.div>
    )
}
