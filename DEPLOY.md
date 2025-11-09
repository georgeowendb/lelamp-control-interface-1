# Deploy LeLamp Control Interface - Make It Public!

## ✅ Board Size: 20x20 (Confirmed!)

Your board is already 20x20 - positions 0-19 = 20 cells in each direction.

## 🌍 Make It Accessible to Anyone (Public URL)

### Option 1: Vercel (Easiest & Free) ⭐ RECOMMENDED

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Build and Deploy:**
   ```bash
   cd browsergame
   npm run build
   vercel
   ```

3. **Follow the prompts:**
   - It will ask a few questions (just press Enter for defaults)
   - You'll get a public URL like: `https://your-project.vercel.app`
   - **Share this URL with anyone!**

4. **Update later:**
   ```bash
   npm run build
   vercel --prod
   ```

### Option 2: Netlify (Drag & Drop)

1. **Build:**
   ```bash
   cd browsergame
   npm run build
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up (free)
   - Drag the `browsergame/dist` folder onto their site
   - Get instant public URL!

### Option 3: GitHub Pages

1. **Build:**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder to GitHub Pages**
   - Create GitHub repo
   - Upload `dist` contents
   - Enable GitHub Pages in repo settings
   - Get URL: `https://yourusername.github.io/repo-name`

### Quick Deploy Script

I'll create a deploy script for you!

## 🔗 Current Access

- **Local:** `http://localhost:5173` (only your computer)
- **Network:** `http://YOUR_IP:5173` (same WiFi)
- **Public:** After deploying (anyone, anywhere)

## 📝 Notes

- The site works offline (no backend needed)
- Robot connection requires robot to be on same network
- All settings are saved in browser (localStorage)

