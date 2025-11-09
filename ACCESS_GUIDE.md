# LeLamp Control Interface - Access Guide

## ✅ Everything is Saved!

All your code is saved and ready to use.

## 🌐 How Others Can Access Your Site

### Option 1: Local Network Access (Same WiFi)

1. **Start the server:**
   - Run `start-dev.bat` (or `npm run dev`)
   - The server will show your local IP address

2. **Find your computer's IP address:**
   - Open Command Prompt
   - Type: `ipconfig`
   - Look for "IPv4 Address" (e.g., `192.168.1.100`)

3. **Share the URL:**
   - Give others: `http://YOUR_IP_ADDRESS:5173`
   - Example: `http://192.168.1.100:5173`

4. **Firewall:**
   - Windows may ask to allow the connection - click "Allow"
   - If blocked, allow port 5173 in Windows Firewall

### Option 2: Deploy Online (Anyone Can Access)

**Free hosting options:**

1. **Vercel** (Recommended - Easiest):
   ```bash
   npm install -g vercel
   cd browsergame
   npm run build
   vercel
   ```

2. **Netlify**:
   - Go to netlify.com
   - Drag and drop the `browsergame/dist` folder after running `npm run build`

3. **GitHub Pages**:
   - Build: `npm run build`
   - Upload the `dist` folder to GitHub Pages

### Current Setup

- **Local access:** `http://localhost:5173` (only on your computer)
- **Network access:** `http://YOUR_IP:5173` (others on same WiFi)
- **Port:** 5173 (default Vite port)

### Troubleshooting

1. **Can't access from other devices?**
   - Make sure you're on the same WiFi network
   - Check Windows Firewall settings
   - Verify the server shows `0.0.0.0:5173` when starting

2. **Port already in use?**
   - Change port in `vite.config.js`:
     ```js
     server: {
       port: 3000  // Use different port
     }
     ```

3. **Robot connection issues?**
   - Make sure robot and computer are on same network
   - Update robot IP/hostname in Config panel
   - Check robot server is running

## 🚀 Quick Start

1. **Start server:** Double-click `start-dev.bat`
2. **Access locally:** Open `http://localhost:5173`
3. **Share with others:** Give them `http://YOUR_IP:5173`

Enjoy your LeLamp Control Interface! 🎮

