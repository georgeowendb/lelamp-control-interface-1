# Push to GitHub - Step by Step

## Quick Method (Using the Script)

### Step 1: Create Repository on GitHub

1. Go to: **https://github.com/new**
2. **Repository name:** `lelamp-control-interface` (or whatever you want)
3. **Description:** `LeLamp Robot Control Interface - BoxBots Hackathon 2025`
4. **Visibility:** Public ✅ (or Private if you prefer)
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click **"Create repository"**

### Step 2: Run the Script

**Double-click:** `push-to-github.bat`

This will:
- Initialize git (if needed)
- Add all files
- Create a commit

### Step 3: Connect and Push

**Replace `YOUR_USERNAME` with your GitHub username:**

```bash
cd browsergame
git remote add origin https://github.com/YOUR_USERNAME/lelamp-control-interface.git
git branch -M main
git push -u origin main
```

**If asked for credentials:**
- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (not your password)
  - Get one: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Select `repo` scope
  - Copy the token and use it as password

---

## Manual Method (All Commands)

If you prefer to do it manually:

```bash
cd browsergame
git init
git add .
git commit -m "LeLamp Control Interface - BoxBots Hackathon 2025"
git remote add origin https://github.com/YOUR_USERNAME/lelamp-control-interface.git
git branch -M main
git push -u origin main
```

---

## Troubleshooting

### "Repository not found"
- Make sure you created the repository on GitHub first
- Check the repository name matches exactly
- Verify you're logged into GitHub

### "Authentication failed"
- Use Personal Access Token instead of password
- Create token: https://github.com/settings/tokens
- Select `repo` scope

### "Remote already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/lelamp-control-interface.git
```

### "Failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## After Pushing

Your code is now at:
```
https://github.com/YOUR_USERNAME/lelamp-control-interface
```

**Share this link with your team!**

---

## Quick Reference

**All commands in one block:**
```bash
cd browsergame
git init
git add .
git commit -m "LeLamp Control Interface"
git remote add origin https://github.com/YOUR_USERNAME/lelamp-control-interface.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username!


