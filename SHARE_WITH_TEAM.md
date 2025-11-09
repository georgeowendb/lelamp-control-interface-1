# Share with Your Team

## Quick Options

### Option 1: GitHub (Best for Team)

1. **Push to GitHub** (if you haven't already):
   ```bash
   cd browsergame
   git init
   git add .
   git commit -m "LeLamp Control Interface"
   git remote add origin https://github.com/YOUR_USERNAME/lelamp-control-interface-boxbots-hackathon-2025.git
   git branch -M main
   git push -u origin main
   ```

2. **Share the link:**
   ```
   https://github.com/YOUR_USERNAME/lelamp-control-interface-boxbots-hackathon-2025
   ```

3. **They can:**
   - Clone it: `git clone [your-repo-url]`
   - Or download as ZIP from GitHub
   - Run `npm install` then `npm run dev`

---

### Option 2: Share Built Files (No Setup Needed)

1. **Build it:**
   ```bash
   cd browsergame
   npm run build
   ```

2. **Zip the `dist` folder:**
   - Right-click `browsergame/dist` folder
   - Send to → Compressed (zipped) folder
   - Name it: `lelamp-control-interface.zip`

3. **Share the zip file:**
   - Email, Discord, Google Drive, etc.
   - They just unzip and open `index.html` in browser

---

### Option 3: Deploy & Share Link (Easiest)

1. **Deploy to Vercel:**
   ```bash
   npm install -g vercel
   cd browsergame
   npm run build
   vercel
   ```

2. **Get URL:** `https://your-project.vercel.app`

3. **Share the link** - they just open it in browser, no setup needed!

---

## For Your Hackathon Demo

**Best option:** Deploy to Vercel and share the link. Everyone can access it instantly, no downloads or setup.

**If they need to run it locally:** Share the GitHub repo or the built files zip.

---

## Quick Commands

**Build for sharing:**
```bash
cd browsergame
npm run build
```

**Start dev server:**
```bash
cd browsergame
start-dev.bat
```

**Deploy:**
```bash
cd browsergame
deploy-vercel.bat
```

