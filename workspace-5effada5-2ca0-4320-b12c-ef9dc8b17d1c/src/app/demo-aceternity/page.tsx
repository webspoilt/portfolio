'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Lock, Zap, Terminal, Code2, Shield, Rocket, ArrowRight, Star, Sparkles as SparklesIcon, Home, User, Mail, Heart, BookOpen, Monitor, Smartphone, Globe, Database, Cpu, Brain } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import AuroraBackground from '@/components/AuroraBackground'
import CardSpotlight from '@/components/CardSpotlight'
import Sparkles from '@/components/Sparkles'
import FloatingDock from '@/components/FloatingDock'
import InfiniteMovingCards from '@/components/InfiniteMovingCards'

export default function AceternityDemoPage() {
  // Floating dock items
  const dockItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', href: '/' },
    { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: 'https://github.com/webspoilt' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Projects', href: '/#featured' },
    { icon: <User className="w-5 h-5" />, label: 'About', href: '/#skills' },
    { icon: <Mail className="w-5 h-5" />, label: 'Contact', href: '/#contact' }
  ]

  // Project cards for infinite moving
  const projectCards = [
    {
      icon: <Lock className="w-12 h-12 text-emerald-400" />,
      title: 'VAULT',
      gradient: 'from-emerald-500/20 to-cyan-500/20',
      tags: ['Next.js', 'Rust', 'Go']
    },
    {
      icon: <Zap className="w-12 h-12 text-orange-400" />,
      title: 'Code Janitor',
      gradient: 'from-orange-500/20 to-red-500/20',
      tags: ['Python', 'AI', 'LLM']
    },
    {
      icon: <Terminal className="w-12 h-12 text-blue-400" />,
      title: 'UltraOS',
      gradient: 'from-blue-500/20 to-purple-500/20',
      tags: ['Rust', 'C', 'Assembly']
    },
    {
      icon: <Code2 className="w-12 h-12 text-purple-400" />,
      title: 'NexusLang',
      gradient: 'from-violet-500/20 to-fuchsia-500/20',
      tags: ['Compiler', 'Runtime', 'WASM']
    },
    {
      icon: <Shield className="w-12 h-12 text-green-400" />,
      title: 'TrustMarket',
      gradient: 'from-green-500/20 to-teal-500/20',
      tags: ['Next.js', 'Socket.io', 'MongoDB']
    }
  ]

  return (
    <AuroraBackground>
      {/* Sparkles overlay */}
      <Sparkles count={100} minSize={2} maxSize={5} />

      {/* Content */}
      <div className="min-h-screen relative z-10 pb-32">
        {/* Header */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge className="text-sm bg-purple-500/20 border-purple-500/50 text-purple-300 px-4 py-1 mb-6">
              <SparklesIcon className="w-4 h-4 mr-1" />
              Aceternity UI Style
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              5 Premium{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Components
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Aurora Background, Card Spotlight, Sparkles, Floating Dock, and Infinite Moving Cards
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-purple-500/30"
              >
                <Link href="/">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Section 1: Card Spotlight */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="text-sm bg-purple-500/20 border-purple-500/50 text-purple-300 mb-4">
              <Star className="w-4 h-4 mr-1" />
              Card Spotlight
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Spotlight Effect Cards
              </span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Hover over cards to see the spotlight effect that follows your cursor
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardSpotlight>
              <Lock className="w-16 h-16 text-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">VAULT</h3>
              <p className="text-slate-300 mb-4">
                Enterprise-grade secure messaging with post-quantum cryptography
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-emerald-500/20 border-emerald-500/30 text-emerald-300">Security</Badge>
                <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-300">Encryption</Badge>
              </div>
            </CardSpotlight>

            <CardSpotlight>
              <Zap className="w-16 h-16 text-orange-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Code Janitor</h3>
              <p className="text-slate-300 mb-4">
                AI-powered automated code refactoring tool with LLM capabilities
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-orange-500/20 border-orange-500/30 text-orange-300">AI</Badge>
                <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-300">Refactoring</Badge>
              </div>
            </CardSpotlight>

            <CardSpotlight>
              <Terminal className="w-16 h-16 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">UltraOS</h3>
              <p className="text-slate-300 mb-4">
                Revolutionary modular OS kernel with native AI/ML integration
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-300">OS</Badge>
                <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-300">Kernel</Badge>
              </div>
            </CardSpotlight>
          </div>
        </section>

        {/* Section 2: Infinite Moving Cards */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="text-sm bg-purple-500/20 border-purple-500/50 text-purple-300 mb-4">
              <Monitor className="w-4 h-4 mr-1" />
              Infinite Moving Cards
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Continuous Project Showcase
              </span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Projects that move infinitely in a loop, perfect for showcasing your work
            </p>
          </motion.div>

          <InfiniteMovingCards speed={40} direction="left" pauseOnHover={true} className="py-8">
            {projectCards.map((project, index) => (
              <div
                key={index}
                className="relative group bg-gradient-to-br from-slate-900/95 to-black/95 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 rounded-3xl p-8 flex-shrink-0 w-[350px] transition-all duration-500 hover:scale-105"
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-4">{project.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Project description goes here with more details
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-purple-500/30 text-slate-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </InfiniteMovingCards>
        </section>

        {/* Section 3: Skills Grid */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="text-sm bg-purple-500/20 border-purple-500/50 text-purple-300 mb-4">
              <Cpu className="w-4 h-4 mr-1" />
              Skills
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Tech Stack
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: <Terminal className="w-6 h-6 text-purple-400" />, name: 'OS Dev' },
              { icon: <Code2 className="w-6 h-6 text-blue-400" />, name: 'Full-Stack' },
              { icon: <Shield className="w-6 h-6 text-green-400" />, name: 'Security' },
              { icon: <Brain className="w-6 h-6 text-pink-400" />, name: 'AI/ML' },
              { icon: <Database className="w-6 h-6 text-cyan-400" />, name: 'Blockchain' },
              { icon: <Cpu className="w-6 h-6 text-orange-400" />, name: 'Edge AI' },
              { icon: <Globe className="w-6 h-6 text-emerald-400" />, name: 'Web3' },
              { icon: <Smartphone className="w-6 h-6 text-violet-400" />, name: 'PWA' },
            ].map((skill, index) => (
              <CardSpotlight key={index} className="p-6">
                <div className="flex flex-col items-center text-center gap-3">
                  {skill.icon}
                  <span className="font-medium">{skill.name}</span>
                </div>
              </CardSpotlight>
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8 backdrop-blur-xl">
              <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">All 5 Components Working!</h3>
              <p className="text-slate-300">
                This demo showcases all 5 Aceternity UI-style components recreated for your portfolio using Framer Motion and Tailwind CSS. Each component matches your purple/pink theme perfectly!
              </p>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Floating Dock */}
      <FloatingDock items={dockItems} />
    </AuroraBackground>
  )
}
