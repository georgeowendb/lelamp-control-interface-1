# 🚀 LeLamp Control - Quick Start for Demo

## ✅ Everything is Saved!

All code is saved and ready for your demo.

## 📱 Get Your Site Online (3 Options)

### Option 1: Vercel (2 Minutes - RECOMMENDED) ⭐

1. **Install Vercel:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd browsergame
   npm run build
   vercel
   ```

3. **Get URL:** `https://your-project.vercel.app`
   - Share this with anyone!
   - Works anywhere in the world

**OR just double-click:** `deploy-vercel.bat`

### Option 2: Local Network (Same WiFi)

1. **Start server:** Double-click `start-dev.bat`
2. **Find your IP:** Look in terminal for `Network: http://192.168.1.XXX:5173`
3. **Share that URL** with others on same WiFi

### Option 3: Netlify (Drag & Drop)

1. **Build:**
   ```bash
   cd browsergame
   npm run build
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Drag `browsergame/dist` folder
   - Get instant URL!

## 🤖 Connect Your Robot

1. **Start robot server:**
   ```bash
   python robot_server_example.py
   ```
   - Note your robot's IP address

2. **In web interface:**
   - Click **"Configuration"** button
   - Enter robot IP or hostname
   - Enter port: `5000`
   - Click **"Robot: OFF"** → turns **ON**
   - Status should show **"Connected"** (green)

3. **Test:**
   - Press arrow keys
   - Robot should receive commands
   - Check robot server console

## ✅ Demo Checklist

- [ ] Web interface running
- [ ] Robot server running  
- [ ] Configuration set (IP + port)
- [ ] Status shows "Connected"
- [ ] Movement works
- [ ] Robot responds to commands

## 🎯 What to Show in Demo

1. **Interface:** Clean, professional 20×20 grid
2. **Movement:** Smooth WASD/arrow key control
3. **Robot:** Real-time connection and control
4. **Features:** IP/hostname support, path tracking, stats

## 🔗 Files Created

- `DEMO_SETUP.md` - Complete setup guide
- `QUICK_START.md` - This file (quick reference)
- `deploy-vercel.bat` - One-click deploy script
- `ACCESS_GUIDE.md` - Network access guide

**Everything is ready for your demo!** 🎉

