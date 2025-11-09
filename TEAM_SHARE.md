# Share with Your Team

## Easiest Way: GitHub

### 1. Create repo on GitHub
- Go to github.com/new
- Name: `lelamp-control-interface`
- Make it public
- Don't check "Initialize with README"

### 2. Push your code
```bash
cd browsergame
git init
git add .
git commit -m "LeLamp control interface"
git remote add origin https://github.com/YOUR_USERNAME/lelamp-control-interface.git
git branch -M main
git push -u origin main
```

### 3. Share the link
```
https://github.com/YOUR_USERNAME/lelamp-control-interface
```

They can:
- Clone it: `git clone [your-link]`
- Or download ZIP from GitHub
- Then: `npm install` and `npm run dev`

---

## Even Easier: Deploy & Share Link

1. Run: `deploy-vercel.bat`
2. Get URL: `https://your-project.vercel.app`
3. Share the link - they just open it, no setup needed

---

## Or: Share Built Files

1. Run: `share-built-files.bat`
2. Zip the `dist` folder
3. Share the zip
4. They unzip and open `index.html`

---

**That's it!** Pick whichever works best for your team.

