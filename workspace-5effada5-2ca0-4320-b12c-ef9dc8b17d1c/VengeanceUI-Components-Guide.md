# VengeanceUI-Style Components for Your Portfolio

I've created 3 premium components with VengeanceUI-style effects using your existing tech stack (Framer Motion + Tailwind + shadcn/ui).

---

## 📁 Files Created

### 1. `src/components/GlowCard.tsx`
- Cursor-following glow effect
- Smooth animations
- Shine effect
- Perfect for project cards

### 2. `src/components/BentoGrid.tsx`
- Modern bento grid layout
- Responsive (1-4 columns)
- Hover effects
- Perfect for showcasing projects or skills

### 3. `src/components/AnimatedButton.tsx`
- Shine effect on hover
- Glow effect
- Smooth scale animations
- 3 variants: primary, secondary, ghost
- 3 sizes: sm, md, lg
- Icon support

### 4. `src/app/demo-vengeanceui/page.tsx`
- Demo page showing all 3 components
- Visit `/demo-vengeanceui` to see them in action

---

## 🚀 How to Use

### Option 1: View Demo
Visit `/demo-vengeanceui` in your browser to see all components in action!

### Option 2: Integrate into Your Portfolio

#### Use GlowCard in `src/app/page.tsx`:

```tsx
import GlowCard from '@/components/GlowCard'

// Replace your existing Card3D with GlowCard:
{pinnedProjects.map((project, index) => (
  <GlowCard key={project.name} gradient={project.gradient}>
    <div className="flex flex-col h-full">
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4`}>
        {project.icon}
      </div>
      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
      <p className="text-slate-300 mb-4 flex-grow">{project.description}</p>
      <AnimatedButton variant="primary" icon={<Github className="w-4 h-4" />}>
        View on GitHub
      </AnimatedButton>
    </div>
  </GlowCard>
))}
```

#### Use BentoGrid in `src/app/page.tsx`:

```tsx
import { BentoGrid, BentoItem } from '@/components/BentoGrid'

// Replace your featured projects section with:
<BentoGrid>
  {/* Large featured project */}
  <BentoItem colSpan={2} rowSpan={2}>
    <Code2 className="w-8 h-8 text-purple-400 mb-3" />
    <h3 className="text-2xl font-bold mb-2">NexusLang</h3>
    <p className="text-slate-300 mb-4">
      Universal programming language with <50ms startup time
    </p>
    <AnimatedButton variant="primary" size="sm" icon={<Github className="w-4 h-4" />}>
      View on GitHub
    </AnimatedButton>
  </BentoItem>

  {/* Smaller project cards */}
  <BentoItem>
    <Lock className="w-8 h-8 text-emerald-400 mb-3" />
    <h3 className="text-xl font-bold mb-2">VAULT</h3>
    <p className="text-slate-300 text-sm">
      Secure messaging platform
    </p>
  </BentoItem>

  {/* Add more BentoItems for other projects */}
</BentoGrid>
```

#### Use AnimatedButton in `src/app/page.tsx`:

```tsx
import AnimatedButton from '@/components/AnimatedButton'

// Replace your existing Button with AnimatedButton:
<AnimatedButton
  variant="primary"
  size="lg"
  icon={<ArrowRight className="w-5 h-5" />}
  iconPosition="right"
>
  Featured Projects
</AnimatedButton>

// Or use in your hero section:
<AnimatedButton
  variant="primary"
  size="lg"
  icon={<Github className="w-5 h-5" />}
>
  View GitHub
</AnimatedButton>
```

---

## 📋 Component Props

### GlowCard

```tsx
<GlowCard gradient="from-purple-500 to-pink-500" className="my-custom-class">
  Your content here
</GlowCard>
```

- `gradient` (required): Tailwind gradient classes
- `className` (optional): Additional CSS classes

### BentoGrid

```tsx
<BentoGrid className="gap-6">
  <BentoItem colSpan={2} rowSpan={2}>Large item</BentoItem>
  <BentoItem>Small item</BentoItem>
</BentoGrid>
```

### AnimatedButton

```tsx
<AnimatedButton
  variant="primary"  // 'primary' | 'secondary' | 'ghost'
  size="lg"         // 'sm' | 'md' | 'lg'
  icon={<ArrowRight className="w-5 h-5" />}
  iconPosition="right"  // 'left' | 'right'
  className="w-full"
>
  Button Text
</AnimatedButton>
```

---

## 🎨 Tips

1. **Glow Cards**: Perfect for your featured projects section - each card glows where your cursor is
2. **Bento Grid**: Great for displaying all 5 projects in a modern grid layout
3. **Animated Buttons**: Replace all your CTA buttons for smoother interactions
4. **Combine**: Use all 3 together for maximum visual impact!

---

## ✨ What's Included

✓ Cursor-following glow effects
✓ Smooth hover animations
✓ Shine effects
✓ Border glows
✓ Responsive design
✓ TypeScript support
✓ Matches your purple/pink theme
✓ Zero dependencies (uses your existing stack)
✓ Copy-paste ready code

---

## 🚀 Next Steps

1. Visit `/demo-vengeanceui` to see the components
2. Copy the components you want into `src/app/page.tsx`
3. Replace existing components with enhanced versions
4. Deploy to Vercel and enjoy!

---

All components are production-ready and match your existing design system! 🎉
