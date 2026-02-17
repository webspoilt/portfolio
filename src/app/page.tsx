'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Github, ExternalLink, Code2, Shield, Terminal, Brain, Cpu, Globe, Lock, Database, Zap, Star, Users, FolderKanban, Menu, X, ArrowRight, Rocket, MessageCircle, Box, Eye, CheckCircle, AlertTriangle, Linkedin, Mail, Sparkles, Shirt } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import WebspoiltLogo from '@/components/WebspoiltLogo'
import Hero3D from '@/components/3DHero'
import Card3D from '@/components/Card3D'
import MagneticButton from '@/components/MagneticButton'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  topics: string[]
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

interface PinnedProject {
  name: string
  title: string
  description: string
  url: string
  website?: string
  icon: React.ReactNode
  gradient: string
  features: string[]
  tech: string[]
}

export default function PortfolioPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, opacity: number }>>([])

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const mouseX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const mouseY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const mouseX_half = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const mouseY_half = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })

  useEffect(() => {
    setMounted(true)
    fetchGitHubRepos()

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      mouseX.set(e.clientX * 0.05)
      mouseY.set(e.clientY * 0.05)
      mouseX_half.set(e.clientX * 0.025)
      mouseY_half.set(e.clientY * 0.025)

      // Add particles at mouse position
      if (Math.random() > 0.7) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          opacity: 1
        }
        setParticles(prev => [...prev.slice(-20), newParticle])
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Fade out particles
    const interval = setInterval(() => {
      setParticles(prev => prev
        .map(p => ({ ...p, opacity: p.opacity - 0.02 }))
        .filter(p => p.opacity > 0)
      )
    }, 50)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  const fetchGitHubRepos = async () => {
    try {
      const response = await fetch('/api/github?XTransformPort=3000')
      const data = await response.json()
      setRepos(data)
    } catch (error) {
      console.error('Error fetching repos:', error)
    } finally {
      setLoading(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const pinnedProjects: PinnedProject[] = [
    {
      name: 'willitfit',
      title: 'WillItFit',
      description: 'AI-powered virtual try-on application revolutionizing e-commerce with accurate size recommendations and augmented reality visualization.',
      url: 'https://github.com/webspoilt/willitfit',
      website: 'https://willitfit-smoky.vercel.app/',
      icon: <Shirt className="w-8 h-8" />,
      gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
      features: [
        'Virtual Try-On',
        'AI Size Recommendation',
        'Browser Extension',
        'Real-time Analysis',
        'Cross-Platform'
      ],
      tech: ['Next.js', 'Python', 'Bun', 'TensorFlow', 'React']
    },
    {
      name: 'vault',
      title: 'VAULT',
      description: 'Enterprise-grade secure messaging platform for government and business-critical communications with end-to-end encryption and post-quantum cryptography. Founded and built from the ground up to revolutionize secure communications.',
      url: 'https://github.com/webspoilt/vault',
      website: 'https://b2g-vault.vercel.app/',
      icon: <Lock className="w-8 h-8" />,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      features: [
        'Zero-Knowledge Architecture',
        'Post-Quantum Encryption (ML-KEM-768)',
        'Encrypted Voice/Video Calls',
        'Self-Destructing Messages',
        'Air-Gapped Deployment'
      ],
      tech: ['Next.js', 'Rust', 'Go', 'React Native', 'Tauri']
    },
    {
      name: 'vulnforge-academy',
      title: 'VulnForge Academy',
      description: 'Comprehensive cybersecurity training platform offering hands-on vulnerability assessment labs, real-world attack simulations, and progressive learning paths for aspiring security professionals.',
      url: 'https://github.com/webspoilt/vulnforge-academy',
      icon: <Shield className="w-8 h-8" />,
      gradient: 'from-red-500 via-orange-500 to-yellow-500',
      features: [
        'Hands-on Vulnerability Labs',
        'Real-world Attack Simulations',
        'CTF Challenges & Red Teaming',
        'OWASP Top 10 Training',
        'Progressive Learning Paths'
      ],
      tech: ['Next.js', 'React', 'Node.js', 'Docker', 'MongoDB']
    },
    {
      name: 'code-janitor',
      title: 'Code Janitor',
      description: 'AI-powered automated code refactoring tool combining static analysis with LLM capabilities for intelligent code cleaning and optimization.',
      url: 'https://github.com/webspoilt/code-janitor',
      icon: <Zap className="w-8 h-8" />,
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      features: [
        'Multi-Phase Analysis',
        'Code Smell Detection',
        'Security Scanning',
        'AI-Powered Refactoring',
        'Deep Nesting Detection'
      ],
      tech: ['Python', 'OpenAI', 'AST', 'LLM', 'Static Analysis']
    },
    {
      name: 'ultraos',
      title: 'UltraOS',
      description: 'Revolutionary modular OS kernel adapting from IoT devices (128MB) to supercomputers (1TB+) with native AI/ML integration.',
      url: 'https://github.com/webspoilt/ultraos',
      icon: <Terminal className="w-8 h-8" />,
      gradient: 'from-blue-500 via-violet-500 to-purple-500',
      features: [
        'Hardware Abstraction Layer',
        'Multi-Architecture Support',
        'ML-Powered Scheduler',
        'Hardware-Enforced Security',
        'Progressive Enhancement'
      ],
      tech: ['Rust', 'C', 'Assembly', 'Vulkan', 'QEMU']
    },
    {
      name: 'nexuslang',
      title: 'NexusLang',
      description: 'Universal programming language designed for AI, Embedded Systems, Quantum Computing, and Web Development with <50ms startup time.',
      url: 'https://github.com/webspoilt/nexuslang',
      icon: <Code2 className="w-8 h-8" />,
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      features: [
        '<50ms Startup Time',
        'Cross-Platform Support',
        'Built-in AI Assistance',
        'High Performance',
        'Modern Syntax'
      ],
      tech: ['Python', 'WASM', 'Compiler', 'Runtime', 'Type System']
    },
    {
      name: 'trustmarket',
      title: 'TrustMarket',
      description: 'India\'s safest P2P marketplace with video verification, real-time safety monitoring, and comprehensive trust scoring system.',
      url: 'https://github.com/webspoilt/trustmarket',
      icon: <Shield className="w-8 h-8" />,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      features: [
        'Video-First Verification',
        'Dynamic Trust Scoring',
        'Real-Time Safety Monitoring',
        'Two-Tier Identity Verification',
        'PWA Support'
      ],
      tech: ['Next.js', 'Socket.io', 'React', 'MongoDB', 'Node.js']
    }
  ]

  const skills = [
    { icon: <Terminal className="w-6 h-6" />, name: 'OS Development', items: ['Kernel Development', 'Hardware Abstraction', 'Memory Management', 'Device Drivers'] },
    { icon: <Code2 className="w-6 h-6" />, name: 'Full-Stack', items: ['MERN/MEAN Stack', 'Rust & Go', 'Tauri & React Native', 'Next.js & React'] },
    { icon: <Shield className="w-6 h-6" />, name: 'Cybersecurity', items: ['OWASP/Vulnerability Assessment', 'CTF & Red Teaming', 'Security Training', 'Bug Bounty'] },
    { icon: <Brain className="w-6 h-6" />, name: 'AI & ML', items: ['Deep Learning', 'NLP', 'Computer Vision', 'Predictive Analytics'] },
    { icon: <Lock className="w-6 h-6" />, name: 'Blockchain', items: ['Smart Contracts', 'DeFi Security', 'Web3 Development', 'NFT Platforms'] },
    { icon: <Cpu className="w-6 h-6" />, name: 'Emerging Tech', items: ['Post-Quantum Cryptography', 'Edge AI & IoT', 'Zero-Knowledge Proofs', 'Quantum Computing'] }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/50 to-black text-white overflow-x-hidden relative">
      {/* Animated Background - Mouse-tracking gradient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            x: mouseX,
            y: mouseY,
            willChange: 'transform'
          }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.15, 1, 1.15],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            x: -mouseX,
            y: -mouseY,
            willChange: 'transform'
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            x: mouseX_half,
            y: mouseY_half,
            willChange: 'transform, opacity'
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl"
        />

        {/* Cursor-following particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: 1,
              opacity: particle.opacity,
              y: particle.y - 20
            }}
            style={{
              position: 'absolute',
              left: particle.x,
              top: particle.y,
              willChange: 'transform, opacity'
            }}
            className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
          />
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <WebspoiltLogo />

            <div className="hidden md:flex items-center gap-8">
              {['home', 'about', 'featured', 'all-projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section)
                    scrollToSection(section)
                  }}
                  className={`capitalize text-sm font-medium transition-all hover:text-purple-400 ${activeSection === section ? 'text-purple-400' : 'text-slate-300'
                    }`}
                >
                  {section.replace('-', ' ')}
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 space-y-4"
            >
              {['home', 'about', 'featured', 'all-projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section)
                    setMobileMenuOpen(false)
                    scrollToSection(section)
                  }}
                  className={`capitalize text-sm font-medium transition-all hover:text-purple-400 block w-full text-left ${activeSection === section ? 'text-purple-400' : 'text-slate-300'
                    }`}
                >
                  {section.replace('-', ' ')}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
        <Hero3D />
        <div className="container mx-auto text-center relative z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Badge className="text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300 px-4 py-1">
              <Sparkles className="w-4 h-4 mr-1" />
              <span>Full Stack Developer & Founder @ Vault & VulnForge Academy</span>
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            Biswajeet{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Arukha
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto"
          >
            Building the future with secure, scalable solutions. From OS kernels to AI-powered platforms, and leading initiatives like Vault & VulnForge Academy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mb-12 pointer-events-auto"
          >
            <MagneticButton strength={0.6}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-purple-500/30"
              >
                <Link href="#featured">
                  <Rocket className="mr-2 h-5 w-5" />
                  Featured Projects
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.6}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 backdrop-blur-sm"
              >
                <Link href="https://github.com/webspoilt" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub Profile
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-8 justify-center"
          >
            {[
              { value: '36+', label: 'Repositories' },
              { value: '6', label: 'Featured Projects' },
              { value: '6', label: 'Core Domains' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ArrowRight className="w-6 h-6 rotate-90 text-purple-400" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300 mb-4">
              <Users className="w-4 h-4 mr-1" />
              About Me
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Who I Am
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-slate-900/50 to-purple-900/20 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 md:p-12"
          >
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>
                I'm <span className="text-white font-semibold">Biswajeet Arukha</span>, a passionate Full Stack Developer, Cybersecurity Specialist, and Entrepreneur with deep expertise spanning kernel development, AI/ML, blockchain technologies, and secure systems architecture.
              </p>

              <p>
                As the <span className="text-purple-400 font-semibold">Founder of Vault</span>, I'm building India's most secure messaging platform, featuring post-quantum cryptography (ML-KEM-768), zero-knowledge architecture, and military-grade encryption designed for government and enterprise communications. Vault represents my vision for a future where privacy is a fundamental right, not a privilege.
              </p>

              <p>
                I also founded <span className="text-purple-400 font-semibold">VulnForge Academy</span>, a comprehensive cybersecurity training platform that equips aspiring security professionals with hands-on vulnerability assessment skills, real-world attack simulations, and progressive learning paths. My mission is to democratize cybersecurity education and create the next generation of ethical hackers and security researchers.
              </p>

              <p>
                My technical journey spans from low-level OS kernel development with <span className="text-pink-400">UltraOS</span> to creating programming languages like <span className="text-pink-400">NexusLang</span>, building AI-powered tools like <span className="text-pink-400">Code Janitor</span>, and developing secure marketplace platforms like <span className="text-pink-400">TrustMarket</span>. I'm also revolutionizing e-commerce with <span className="text-pink-400">WillItFit</span>, an AI-powered virtual try-on solution. I believe in pushing boundaries and solving complex problems that matter.
              </p>

              <div className="flex flex-wrap gap-4 pt-4 justify-center">
                <Badge className="px-4 py-2 bg-emerald-500/20 border-emerald-500/50 text-emerald-300">
                  <Lock className="w-4 h-4 mr-2" />
                  Vault Founder
                </Badge>
                <Badge className="px-4 py-2 bg-orange-500/20 border-orange-500/50 text-orange-300">
                  <Shield className="w-4 h-4 mr-2" />
                  VulnForge Academy Founder
                </Badge>
                <Badge className="px-4 py-2 bg-purple-500/20 border-purple-500/50 text-purple-300">
                  <Code2 className="w-4 h-4 mr-2" />
                  Full Stack Developer
                </Badge>
                <Badge className="px-4 py-2 bg-pink-500/20 border-pink-500/50 text-pink-300">
                  <Brain className="w-4 h-4 mr-2" />
                  AI/ML Enthusiast
                </Badge>
                <Badge className="px-4 py-2 bg-cyan-500/20 border-cyan-500/50 text-cyan-300">
                  <Shirt className="w-4 h-4 mr-2" />
                  WillItFit Founder
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Separator className="bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Featured Projects Section */}
      <section id="featured" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300 mb-4">
              <Star className="w-4 h-4 mr-1" />
              Pinned Projects
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Featured Work
              </span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              My top projects showcasing expertise in OS development, cybersecurity, AI, and full-stack applications
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16"
          >
            {pinnedProjects.map((project, index) => (
              <Card3D key={project.name} intensity={15} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                <Card className="relative bg-gradient-to-br from-slate-900/80 to-black/80 backdrop-blur-xl border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Icon & Title */}
                      <div className="lg:w-1/3">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30`}
                        >
                          <div className="text-white">
                            {project.icon}
                          </div>
                        </motion.div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="secondary" className="bg-purple-500/20 border-purple-500/30 text-purple-300">
                            Featured
                          </Badge>
                          {project.website && (
                            <Badge variant="secondary" className="bg-green-500/20 border-green-500/30 text-green-300">
                              <Globe className="w-3 h-3 mr-1" />
                              Live
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-300 mb-6">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs border-purple-500/30 text-slate-300">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                View on GitHub
                              </Link>
                            </Button>
                          </motion.div>
                          {project.website && (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button asChild size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10">
                                <Link href={project.website} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Visit Website
                                </Link>
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="lg:w-2/3">
                        <h4 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
                          <Star className="w-5 h-5" />
                          Key Features
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.features.map((feature) => (
                            <motion.div
                              key={feature}
                              whileHover={{ x: 5 }}
                              className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all"
                            >
                              <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-300">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Card3D>
            ))}
          </motion.div>
        </div>
      </section>

      <Separator className="bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* All Projects Section */}
      <section id="all-projects" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                All Projects
              </span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Explore my complete GitHub repository collection
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-slate-900/50 border-purple-500/20">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {repos.filter(repo => !pinnedProjects.some(p => p.name === repo.name)).slice(0, 9).map((repo) => (
                <Card3D key={repo.id} intensity={12} className="relative">
                  <Card className="bg-gradient-to-br from-slate-900/50 to-black/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between gap-2">
                        <span className="text-xl text-white">{repo.name}</span>
                        <motion.a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2 }}
                          className="text-purple-400 hover:text-pink-400 transition-colors flex-shrink-0"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      </CardTitle>
                      <CardDescription className="text-slate-300 line-clamp-3">
                        {repo.description || 'No description available'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs bg-purple-500/20 border-purple-500/30 text-purple-300">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <Code2 className="w-4 h-4" />
                            {repo.language}
                          </span>
                        )}
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            {repo.stargazers_count}
                          </span>
                        )}
                        {repo.forks_count > 0 && (
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {repo.forks_count}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Card3D>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <MagneticButton strength={0.5}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
              >
                <Link href="https://github.com/webspoilt?tab=repositories" target="_blank" rel="noopener noreferrer">
                  View All Repositories
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <Separator className="bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              A comprehensive toolkit for building secure, scalable, and intelligent systems
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02
                }}
              >
                <Card className="bg-gradient-to-br from-slate-900/50 to-purple-900/20 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                        <div className="text-white">{skill.icon}</div>
                      </div>
                      <CardTitle className="text-xl text-white">{skill.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {skill.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Separator className="bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              As the founder of Vault and VulnForge Academy, I am always open to collaborations on exciting projects in cybersecurity, full-stack development, data science, AI, and emerging technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-slate-900/50 to-purple-900/20 backdrop-blur-xl border-purple-500/20 rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Linkedin />, label: 'LinkedIn', value: 'linkedin.com/in/webspoilt', url: 'https://www.linkedin.com/in/webspoilt/', color: 'text-blue-400' },
                { icon: <Mail />, label: 'Email', value: 'heyzerodayhere@gmail.com', url: 'mailto:heyzerodayhere@gmail.com', color: 'text-purple-400' },
                { icon: <Github />, label: 'GitHub', value: '@webspoilt', url: 'https://github.com/webspoilt', color: 'text-pink-400' }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`flex items-center gap-4 p-6 bg-slate-800/50 rounded-xl hover:bg-purple-500/20 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/50`}
                >
                  <div className={`p-3 bg-gradient-to-br ${social.label === 'LinkedIn' ? 'from-blue-500' : social.label === 'Email' ? 'from-purple-500' : 'from-pink-500'} to-transparent rounded-xl`}>
                    <div className={`${social.color}`}>{social.icon}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{social.label}</div>
                    <div className="text-sm text-slate-400">{social.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-purple-500/20">
        <div className="container mx-auto text-center">
          <p className="text-slate-400">
            Made with <span className="text-pink-500">❤️</span> by Biswajeet Arukha
          </p>
          <p className="text-sm text-slate-500 mt-2">© 2025 webspoilt. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating GitHub Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <motion.a
          href="https://github.com/webspoilt"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
        >
          <Github className="w-6 h-6 text-white" />
        </motion.a>
      </motion.div>
    </div>
  )
}

function SparkleIcon() {
  return (
    <div className="flex items-center gap-2">
      <Zap className="w-4 h-4" />
      Full-Stack Developer & Security Expert
    </div>
  )
}
