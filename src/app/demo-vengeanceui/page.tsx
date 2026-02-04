'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Lock, Zap, Terminal, Code2, Shield, Rocket, ArrowRight, Star, Sparkles, Check } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import GlowCard from '@/components/GlowCard'
import { BentoGrid, BentoItem } from '@/components/BentoGrid'
import AnimatedButton from '@/components/AnimatedButton'

export default function VengeanceUIDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/50 to-black text-white p-8">
      {/* Header */}
      <div className="container mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Badge className="text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300 px-4 py-1 mb-6">
            <Sparkles className="w-4 h-4 mr-1" />
            VengeanceUI Style Components
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Enhanced Portfolio{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Components
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Three powerful components with VengeanceUI-style effects using Framer Motion and Tailwind CSS
          </p>
        </motion.div>
      </div>

      {/* Section 1: Animated Buttons */}
      <section className="container mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300 mb-4">
            <Rocket className="w-4 h-4 mr-1" />
            Buttons
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Animated Buttons
            </span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Smooth hover animations with shine, glow, and ripple effects
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-6 justify-center items-center mb-8">
          <AnimatedButton variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Primary Button
          </AnimatedButton>
          <AnimatedButton variant="secondary" size="lg" icon={<ExternalLink className="w-5 h-5" />}>
            Secondary Button
          </AnimatedButton>
          <AnimatedButton variant="ghost" size="lg">
            Ghost Button
          </AnimatedButton>
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <AnimatedButton variant="primary" size="sm">Small</AnimatedButton>
          <AnimatedButton variant="primary" size="md">Medium</AnimatedButton>
          <AnimatedButton variant="primary" size="lg">Large</AnimatedButton>
        </div>
      </section>

      {/* Section 2: Glow Cards */}
      <section className="container mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300 mb-4">
            <Star className="w-4 h-4 mr-1" />
            Cards
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Glow Cards
            </span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Cards with cursor-following glow effects and smooth animations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlowCard gradient="from-emerald-500 via-teal-500 to-cyan-500">
            <div className="flex flex-col h-full">
              <Lock className="w-12 h-12 text-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">VAULT</h3>
              <p className="text-slate-300 mb-4 flex-grow">
                Enterprise-grade secure messaging platform with post-quantum cryptography
              </p>
              <AnimatedButton variant="primary" size="md" icon={<Github className="w-4 h-4" />}>
                View Project
              </AnimatedButton>
            </div>
          </GlowCard>

          <GlowCard gradient="from-orange-500 via-red-500 to-pink-500">
            <div className="flex flex-col h-full">
              <Zap className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Code Janitor</h3>
              <p className="text-slate-300 mb-4 flex-grow">
                AI-powered automated code refactoring tool with LLM capabilities
              </p>
              <AnimatedButton variant="secondary" size="md" icon={<Github className="w-4 h-4" />}>
                View Project
              </AnimatedButton>
            </div>
          </GlowCard>

          <GlowCard gradient="from-blue-500 via-violet-500 to-purple-500">
            <div className="flex flex-col h-full">
              <Terminal className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">UltraOS</h3>
              <p className="text-slate-300 mb-4 flex-grow">
                Revolutionary modular OS kernel with native AI/ML integration
              </p>
              <AnimatedButton variant="primary" size="md" icon={<Github className="w-4 h-4" />}>
                View Project
              </AnimatedButton>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* Section 3: Bento Grid */}
      <section className="container mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300 mb-4">
            <Check className="w-4 h-4 mr-1" />
            Layout
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Bento Grid Layout
            </span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Modern responsive grid layout with smooth animations
          </p>
        </motion.div>

        <BentoGrid>
          {/* Featured Project - Large */}
          <BentoItem colSpan={2} rowSpan={2}>
            <Code2 className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-2xl font-bold mb-2">NexusLang</h3>
            <p className="text-slate-300 mb-4">
              Universal programming language for AI, Embedded Systems, Quantum Computing, and Web Development with &lt;50ms startup time.
            </p>
            <div className="flex flex-wrap gap-2 mb-4 mt-auto">
              <span className="text-xs bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2 py-1 rounded">Python</span>
              <span className="text-xs bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2 py-1 rounded">WASM</span>
              <span className="text-xs bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2 py-1 rounded">Compiler</span>
            </div>
            <AnimatedButton variant="primary" size="sm" icon={<Github className="w-4 h-4" />}>
              View on GitHub
            </AnimatedButton>
          </BentoItem>

          {/* Small Items */}
          <BentoItem>
            <Lock className="w-8 h-8 text-emerald-400 mb-3" />
            <h3 className="text-xl font-bold mb-2">VAULT</h3>
            <p className="text-slate-300 text-sm">
              Secure messaging with post-quantum encryption
            </p>
          </BentoItem>

          <BentoItem>
            <Zap className="w-8 h-8 text-orange-400 mb-3" />
            <h3 className="text-xl font-bold mb-2">Code Janitor</h3>
            <p className="text-slate-300 text-sm">
              AI-powered code refactoring tool
            </p>
          </BentoItem>

          <BentoItem>
            <Terminal className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-xl font-bold mb-2">UltraOS</h3>
            <p className="text-slate-300 text-sm">
              Modular OS kernel with AI/ML integration
            </p>
          </BentoItem>

          <BentoItem>
            <Shield className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-xl font-bold mb-2">TrustMarket</h3>
            <p className="text-slate-300 text-sm">
              Safest P2P marketplace with trust scoring
            </p>
          </BentoItem>
        </BentoGrid>
      </section>

      {/* Combined Example */}
      <section className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300 mb-4">
            <Sparkles className="w-4 h-4 mr-1" />
            Combined
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              All Components Together
            </span>
          </h2>
        </motion.div>

        <BentoGrid>
          <BentoItem colSpan={2} rowSpan={2}>
            <div className="flex flex-col h-full">
              <h3 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  Biswajeet Arukha
                </span>
              </h3>
              <p className="text-slate-300 mb-6">
                Full Stack Developer specializing in secure, scalable solutions. From OS kernels to AI-powered platforms.
              </p>
              <div className="flex flex-wrap gap-3 mt-auto">
                <AnimatedButton variant="primary" size="md" icon={<Github className="w-4 h-4" />}>
                  GitHub
                </AnimatedButton>
                <AnimatedButton variant="secondary" size="md" icon={<ExternalLink className="w-4 h-4" />}>
                  Projects
                </AnimatedButton>
              </div>
            </div>
          </BentoItem>

          <BentoItem>
            <Shield className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-xl font-bold mb-2">Cybersecurity</h3>
            <p className="text-slate-300 text-sm">
              Web Pen Testing, Threat Intelligence, Security Auditing
            </p>
          </BentoItem>

          <BentoItem>
            <Code2 className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-xl font-bold mb-2">Full-Stack</h3>
            <p className="text-slate-300 text-sm">
              MERN/MEAN Stack, Real-time Apps, PWA
            </p>
          </BentoItem>
        </BentoGrid>
      </section>
    </div>
  )
}
