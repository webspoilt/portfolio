'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export interface DockItem {
    icon: React.ReactNode
    label: string
    href: string
    onClick?: () => void
}

interface FloatingDockProps {
    items: DockItem[]
    className?: string
}

export default function FloatingDock({ items, className = '' }: FloatingDockProps) {
    const mouseX = useMotionValue(Infinity)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex h-16 gap-4 items-end rounded-2xl bg-black/50 backdrop-blur-md px-4 pb-3 border border-purple-500/20 z-50 ${className}`}
        >
            {items.map((item, index) => (
                <IconContainer
                    key={item.label}
                    mouseX={mouseX}
                    index={index}
                    total={items.length}
                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
                    item={item}
                />
            ))}
        </motion.div>
    )
}

interface IconContainerProps {
    mouseX: any
    index: number
    total: number
    hoveredIndex: number | null
    setHoveredIndex: (index: number | null) => void
    item: DockItem
}

function IconContainer({ mouseX, index, total, hoveredIndex, setHoveredIndex, item }: IconContainerProps) {
    const ref = useRef<HTMLAnchorElement>(null)

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
        return val - bounds.x - bounds.width / 2
    })

    const widthSync = useTransform(distance, [-150, 150], [40, 80])
    const width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12
    })

    const heightSync = useTransform(distance, [-150, 150], [40, 80])
    const height = useSpring(heightSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12
    })

    return (
        <motion.a
            ref={ref}
            href={item.href}
            onClick={(e) => {
                if (item.onClick) {
                    e.preventDefault()
                    item.onClick()
                }
            }}
            className="relative flex items-center justify-center cursor-pointer"
            style={{ width, height }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.9 }}
        >
            {/* Tooltip */}
            <motion.div
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-purple-500/90 backdrop-blur-xl text-white text-xs font-medium rounded-lg whitespace-nowrap"
                initial={{ opacity: 0, y: 5 }}
                animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 5
                }}
                transition={{ duration: 0.2 }}
            >
                {item.label}
            </motion.div>

            {/* Icon */}
            <div className="w-8 h-8 flex items-center justify-center text-white">
                {item.icon}
            </div>

            {/* Glow effect on hover */}
            {hoveredIndex === index && (
                <motion.div
                    className="absolute inset-0 rounded-xl bg-purple-500/30 blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                />
            )}
        </motion.a>
    )
}
