# 🚀 Portfolio Website - Publishing Guide

Welcome to your stunning 3D-animated portfolio website! This guide will help you publish it for FREE.

## 🌟 Features Included

✅ **Beautiful 3D Effects & Animations**
- Framer Motion powered animations
- 3D card hover effects with rotation
- Floating background elements
- Gradient text animations
- Pulse glow effects

✅ **Dynamic GitHub Integration**
- Automatic fetching of your GitHub repositories
- Real-time project display
- Stars, forks, and topics visualization

✅ **Fully Responsive Design**
- Mobile-first approach
- Responsive navigation with mobile menu
- Works on all device sizes

✅ **Professional Sections**
- Hero section with animated background
- Projects showcase with 3D cards
- Skills & expertise display
- Contact section with social links

---

## 📦 Publishing Options (FREE)

### Option 1: Vercel (Recommended - Easiest)

**Pros:**
- Free forever for personal projects
- Automatic deployments from GitHub
- Fast CDN
- HTTPS included
- Custom domains supported

**Steps:**

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/webspoilt/portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - Click "Add New Project"
   - Select your portfolio repository
   - Click "Deploy"
   - That's it! 🎉

3. **Get your URL**
   - Vercel will provide a URL like: `https://portfolio-xyz.vercel.app`
   - Your site is now live!

---

### Option 2: Netlify

**Pros:**
- Free tier generous
- Easy drag-and-drop deployment
- Automatic HTTPS
- Form handling included

**Steps:**

1. **Build your project locally**
   ```bash
   bun run build
   ```

2. **Deploy via Netlify Dashboard**
   - Go to [netlify.com](https://netlify.com)
   - Sign up for free
   - Drag and drop your `.next` and `public` folders
   - Or connect your GitHub repository

3. **Or use Netlify CLI**
   ```bash
   bun install -g netlify-cli
   bun run build
   netlify deploy --prod
   ```

---

### Option 3: GitHub Pages

**Pros:**
- Completely free
- Integrated with GitHub
- Simple setup

**Steps:**

1. **Configure `next.config.js`**
   Create or update `next.config.js`:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }
   module.exports = nextConfig
   ```

2. **Update `package.json`**
   Add to `"homepage"` field:
   ```json
   "homepage": "https://webspoilt.github.io/portfolio"
   ```

3. **Build and Deploy**
   ```bash
   bun run build
   # The output will be in 'out' folder
   ```

4. **Push to GitHub**
   - Create a repository named `portfolio`
   - Push your code
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `out`
   - Save!

5. **Access your site**
   - URL: `https://webspoilt.github.io/portfolio`

---

### Option 4: Cloudflare Pages

**Pros:**
- Free unlimited bandwidth
- Fast CDN (Cloudflare)
- Global edge network
- DDoS protection

**Steps:**

1. **Go to Cloudflare Pages**
   - Visit [dash.cloudflare.com](https://dash.cloudflare.com)
   - Create account (free)
   - Go to Workers & Pages

2. **Connect GitHub**
   - Click "Create a project"
   - Connect your GitHub account
   - Select your portfolio repository

3. **Configure Build Settings**
   - Build command: `bun run build`
   - Output directory: `.next` or configure as needed
   - Click "Save and Deploy"

---

## 🎨 Customization

### Change Your GitHub Username

Update in `src/app/api/github/route.ts`:
```typescript
const username = 'webspoilt' // Change to your username
```

### Update Your Profile Information

Edit `src/app/page.tsx` and update:
- Your name
- Bio/description
- Social links
- Skills and expertise

### Change Colors

Update the gradient in `src/app/page.tsx`:
```tsx
// Change purple/pink to your favorite colors
className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
```

---

## 🔧 Environment Setup (If Needed)

If you need environment variables:

**Vercel:**
- Go to Project Settings → Environment Variables
- Add your variables
- Redeploy

**Netlify:**
- Site Settings → Environment Variables
- Add your variables

**GitHub Pages:**
- Settings → Secrets → Actions → New repository secret
- Add your variables

---

## 🌐 Custom Domain Setup

### Step 1: Buy a Domain
- Namecheap (~$10/year)
- GoDaddy (~$12/year)
- Cloudflare (~$10/year)

### Step 2: Connect Domain

**On Vercel:**
1. Go to Settings → Domains
2. Add your domain (e.g., `biswajeetarukha.com`)
3. Follow the DNS instructions provided

**On Netlify:**
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records

**On GitHub Pages:**
1. Go to repository Settings → Pages
2. Add custom domain
3. Update DNS at your domain registrar

### Step 3: HTTPS
All platforms provide free SSL certificates automatically! ✨

---

## 📊 Performance Optimization

Your portfolio is already optimized! Here's what's included:

✅ **Next.js 16** with App Router
✅ **Static Generation** for fast loading
✅ **Image Optimization**
✅ **Code Splitting**
✅ **Lazy Loading**
✅ **CDN Delivery** (on all platforms)

---

## 🔐 GitHub API Rate Limits

The GitHub API has a rate limit of:
- **60 requests/hour** for unauthenticated requests
- **5000 requests/hour** for authenticated requests

If you need more requests:
1. Create a GitHub Personal Access Token
2. Add as environment variable `GITHUB_TOKEN`
3. Update `src/app/api/github/route.ts`:
```typescript
const response = await fetch(
  `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
  {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  }
)
```

---

## 📱 SEO Optimization

Update `src/app/layout.tsx` metadata:
```typescript
export const metadata = {
  title: 'Biswajeet Arukha | Full-Stack Developer & Security Expert',
  description: 'Portfolio of Biswajeet Arukha - Full-Stack Developer, Cybersecurity Expert, and OS Developer',
  openGraph: {
    title: 'Biswajeet Arukha | Portfolio',
    description: 'Building secure, scalable solutions for the future',
    url: 'https://your-portfolio-url.com',
    images: ['/og-image.png'],
  },
}
```

---

## 🎉 Post-Deployment Checklist

After deploying:

- [ ] Test all links work correctly
- [ ] Check mobile responsiveness
- [ ] Verify GitHub repositories load
- [ ] Test contact/social links
- [ ] Check page load speed
- [ ] Set up custom domain (optional)
- [ ] Add Google Analytics (optional)
- [ ] Submit to Google Search Console

---

## 🚀 Quick Start Command

```bash
# Clone and run locally
git clone https://github.com/webspoilt/portfolio.git
cd portfolio
bun install
bun run dev

# Build for production
bun run build
bun start
```

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **GitHub Pages**: https://docs.github.com/pages
- **Next.js Docs**: https://nextjs.org/docs

---

## 🌟 Bonus Tips

1. **Add Analytics**
   - Vercel Analytics (free)
   - Google Analytics (free)
   - Plausible (free open source)

2. **Monitor Performance**
   - Lighthouse scores
   - Web Vitals
   - Core Web Vitals

3. **SEO**
   - Add meta tags
   - Create sitemap.xml
   - Add robots.txt
   - Submit to search engines

4. **Backup**
   - GitHub is your backup!
   - Export DNS records
   - Keep a copy locally

---

## 💚 You're All Set!

Your beautiful, animated portfolio is ready to impress everyone! 🎊

**Recommended:** Use **Vercel** for the easiest, fastest deployment with automatic updates.

---

Made with ❤️ for your success!
