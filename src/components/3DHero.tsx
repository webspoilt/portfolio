'use client'

import { useMemo, useRef, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
  const hexGroupRef = useRef<THREE.Group>(null)
  const innerHexRef = useRef<THREE.Mesh>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const targetTilt = useRef({ x: 0, y: 0 })

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Create particles - very optimized count
  const particles = useMemo(() => {
    const count = 500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30

      colors[i * 3] = 0.5 + Math.random() * 0.5
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.3
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
    }

    return { positions, colors, count }
  }, [])

  useFrame(() => {
    if (hexGroupRef.current) {
      // FIXED CENTER POSITION - Nailed to center, never drifts
      hexGroupRef.current.position.set(0, 0, 0)

      // 360° 3D Rotation - Automatic spinning
      hexGroupRef.current.rotation.y += 0.005

      // Interactive Tilt Effect - Rotate to face cursor (smooth lerping)
      targetTilt.current.x = mousePos.y * 0.3  // Tilt based on vertical mouse position
      targetTilt.current.y = mousePos.x * 0.3  // Tilt based on horizontal mouse position

      // Smooth interpolation for responsive but stable tilt
      hexGroupRef.current.rotation.x += (targetTilt.current.x - hexGroupRef.current.rotation.x) * 0.05
      // Note: rotation.y already has auto-spin, add tilt on top
      const baseSpin = hexGroupRef.current.rotation.y
      hexGroupRef.current.rotation.z += (targetTilt.current.y * 0.5 - hexGroupRef.current.rotation.z) * 0.05
    }

    // Inner gold hexagon spins in OPPOSITE direction for high-tech look
    if (innerHexRef.current) {
      innerHexRef.current.rotation.y -= 0.008  // Opposite direction, slightly faster
      innerHexRef.current.rotation.x -= 0.003
    }
  })

  return (
    <>
      <Stars
        radius={50}
        depth={20}
        count={1000}
        factor={2}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* Main Hex Group - Fixed at center */}
      <group ref={hexGroupRef} position={[0, 0, 0]}>
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
          {/* Outer Purple Hexagon */}
          <mesh position={[0, 0, 0]}>
            <icosahedronGeometry args={[1.8, 1]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
              wireframe
            />
          </mesh>

          {/* Inner Gold Hexagon - Spins opposite direction */}
          <mesh ref={innerHexRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[1.0, 0]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={0.4}
              metalness={0.9}
              roughness={0.1}
              wireframe
            />
          </mesh>

          {/* Core glow effect */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial
              color="#ec4899"
              emissive="#ec4899"
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      </group>
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        className="bg-transparent"
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} color="#8b5cf6" />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#ec4899" />

          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
