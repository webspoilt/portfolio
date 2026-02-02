'use client'

import { useMemo, useRef, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

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
    if (meshRef.current) {
      // Base rotation - keep it spinning
      meshRef.current.rotation.x += 0.002
      meshRef.current.rotation.y += 0.002

      // Repel from cursor - move in OPPOSITE direction of mouse
      // When cursor goes left (-x), object tilts right (+x)
      meshRef.current.rotation.x -= mousePos.y * 0.05  // Negative sign for repulsion
      meshRef.current.rotation.y -= mousePos.x * 0.05  // Negative sign for repulsion

      // Additional repulsive movement
      meshRef.current.position.x = -mousePos.x * 2    // Moves away from cursor horizontally
      meshRef.current.position.y = mousePos.y * 2     // Moves away from cursor vertically
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

      <group position={[0, 0, 0]}>
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
          <mesh ref={meshRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={0.2}
              metalness={0.7}
              roughness={0.3}
              wireframe
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
