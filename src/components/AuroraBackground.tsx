'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface AuroraBackgroundProps {
    children: React.ReactNode
    className?: string
}

export default function AuroraBackground({ children, className = '' }: AuroraBackgroundProps) {
    const auroras = useMemo(() => [
        { id: 1, color: 'from-purple-500/30 to-pink-500/20', delay: 0, duration: 20 },
        { id: 2, color: 'from-blue-500/20 to-purple-500/30', delay: 5, duration: 25 },
        { id: 3, color: 'from-pink-500/20 to-violet-500/30', delay: 10, duration: 22 },
        { id: 4, color: 'from-violet-500/20 to-fuchsia-500/20', delay: 15, duration: 28 },
    ], [])

    return (
        <div className={`relative min-h-screen overflow-hidden ${className}`}>
            {/* Aurora layers */}
            <div className="absolute inset-0 pointer-events-none">
                {auroras.map((aurora) => (
                    <motion.div
                        key={aurora.id}
                        className={`absolute inset-0 bg-gradient-to-br ${aurora.color} blur-3xl`}
                        initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.2, 1],
                            rotate: [-20, 20, -20],
                            y: [0, -100, 0, 100, 0]
                        }}
                        transition={{
                            duration: aurora.duration,
                            delay: aurora.delay,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            transformOrigin: '50% 100%'
                        }}
                    />
                ))}

                {/* Additional subtle waves */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-purple-900/40 to-transparent blur-3xl"
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        y: [0, -30, 0]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Top glow */}
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl"
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}
