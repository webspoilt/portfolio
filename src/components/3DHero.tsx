'use client'

import { useMemo, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Create particles - very optimized count
  const particles = useMemo(() => {
    const count = 500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2
      const r = 15
      positions[i * 3] = Math.cos(t) * r
      positions[i * 3 + 1] = Math.sin(t) * r
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15

      colors[i * 3] = 0.5 + Math.random() * 0.5
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.3
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
    }

    return { positions, colors, count }
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.002
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

      <points position={[0, 0, -3]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.count}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.count}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          vertexColors
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>
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
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
