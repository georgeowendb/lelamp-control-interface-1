# Install Git to Push to GitHub

## Option 1: Install Git (Recommended)

### Download Git:
1. Go to: **https://git-scm.com/download/win**
2. Download the installer
3. Run the installer
4. Use default settings (just click Next)
5. Restart your terminal/command prompt after installation

### Verify Installation:
```bash
git --version
```
Should show: `git version 2.x.x`

### Then Push to GitHub:
```bash
cd browsergame
git init
git add .
git commit -m "LeLamp Control Interface"
git remote add origin https://github.com/YOUR_USERNAME/lelamp-control-interface.git
git branch -M main
git push -u origin main
```

---

## Option 2: Use GitHub Desktop (Easier)

### Download GitHub Desktop:
1. Go to: **https://desktop.github.com/**
2. Download and install
3. Sign in with your GitHub account
4. Click "Add" → "Add Existing Repository"
5. Select your `browsergame` folder
6. Click "Publish repository"
7. Done!

---

## Option 3: Upload via GitHub Web Interface

### If you can't install Git:

1. **Create repository on GitHub:**
   - Go to: https://github.com/new
   - Create repository (don't initialize with README)

2. **Upload files:**
   - Click "uploading an existing file"
   - Drag and drop your `browsergame` folder contents
   - Click "Commit changes"

**Note:** This uploads everything, including `node_modules` (which is large). Better to use Git if possible.

---

## Option 4: Use WSL (Windows Subsystem for Linux)

If you have WSL installed:
```bash
wsl
cd /mnt/c/new_projects/hackathon11082025/browsergame
git init
git add .
git commit -m "LeLamp Control Interface"
git remote add origin https://github.com/YOUR_USERNAME/lelamp-control-interface.git
git branch -M main
git push -u origin main
```

---

## Quick Install Git (PowerShell as Admin)

If you have admin rights, you can install via winget:
```powershell
winget install --id Git.Git -e --source winget
```

Or via Chocolatey (if installed):
```powershell
choco install git
```

---

## Recommended: Install Git

**Easiest way:** Download from https://git-scm.com/download/win and install. Takes 2 minutes, then you can use all the git commands.


