# LeLamp Control Interface - Demo Setup Guide

## 🎯 Quick Start for Your Demo

### Step 1: Start the Web Interface

1. **Double-click `start-dev.bat`**
   - This starts the development server
   - Wait for it to show: `Local: http://localhost:5173/`
   - Also shows: `Network: http://YOUR_IP:5173/`

2. **Note your IP address** (shown in terminal)
   - Example: `http://192.168.1.100:5173`

### Step 2: Make It Accessible to Others

#### Option A: Same WiFi Network (For Demo)
- Share the **Network URL** with others
- Everyone must be on the same WiFi
- Example: `http://192.168.1.100:5173`

#### Option B: Public URL (Anyone, Anywhere) ⭐ RECOMMENDED FOR DEMO

**Using Vercel (Free, 2 minutes):**

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd browsergame
   npm run build
   vercel
   ```

3. Follow prompts (press Enter for defaults)

4. Get your public URL: `https://your-project.vercel.app`

5. **Share this URL with anyone!**

**Or use the deploy script:**
- Double-click `deploy-vercel.bat`
- Follow the prompts
- Get instant public URL

### Step 3: Connect Your Robot

1. **Start your robot server:**
   ```bash
   python robot_server_example.py
   ```
   - Robot server runs on port 5000
   - Note your robot's IP address

2. **In the web interface:**
   - Click **"Configuration"** button
   - Choose connection type:
     - **IP Address**: Enter robot IP (e.g., `192.168.1.100`)
     - **Hostname**: Enter hostname (e.g., `lelamp.local`)
   - Enter port: `5000` (default)
   - Click **"Robot: OFF"** to turn it **ON**

3. **Verify connection:**
   - Status should show **"Connected"** (green)
   - If "Connection Error", check:
     - Robot server is running
     - IP/hostname is correct
     - Both on same network
     - Firewall allows port 5000

### Step 4: Test Everything

1. **Movement:**
   - Use WASD or arrow keys
   - Marker should move smoothly
   - No glitching or animations

2. **Robot Control:**
   - Each movement sends command to robot
   - Robot should move 3cm per keypress
   - Check robot server console for received commands

3. **Display:**
   - Grid shows 20×20 (coordinates 1-20)
   - Path visualization works
   - All stats update correctly

## 🔧 Troubleshooting

### Can't Access from Other Devices?
- Make sure server shows `Network: http://...`
- Check Windows Firewall (allow port 5173)
- Verify same WiFi network

### Robot Not Connecting?
- Check robot server is running
- Verify IP/hostname in Configuration
- Test with: `curl http://ROBOT_IP:5000/status`
- Make sure robot and computer on same network

### Port Already in Use?
- Change port in `vite.config.js`:
  ```js
  server: {
    port: 3000  // Different port
  }
  ```

## 📋 Demo Checklist

- [ ] Web interface running (`start-dev.bat`)
- [ ] Robot server running (`python robot_server_example.py`)
- [ ] Configuration set (IP/hostname + port)
- [ ] Robot status shows "Connected"
- [ ] Movement works smoothly
- [ ] Robot receives commands (check server console)
- [ ] Public URL ready (if deploying)

## 🌐 Deployment Options

### For Live Demo (Best Options):

1. **Vercel** (Recommended)
   - Free, instant deployment
   - Public URL in 2 minutes
   - Auto-updates on changes

2. **Netlify**
   - Free, drag & drop
   - Instant deployment

3. **GitHub Pages**
   - Free, requires GitHub account
   - Takes a few minutes

### For Local Demo:

- Use Network URL from dev server
- Everyone on same WiFi
- No deployment needed

## 🎮 Demo Flow

1. **Show the interface:**
   - Clean, professional design
   - 20×20 grid
   - Real-time stats

2. **Demonstrate movement:**
   - Smooth WASD/arrow key control
   - Path visualization
   - Coordinate display

3. **Show robot connection:**
   - Configuration panel
   - Connection status
   - Real-time robot control

4. **Highlight features:**
   - IP and hostname support
   - Distance tracking (3cm per move)
   - Path memory
   - Professional UI/UX

## 💡 Pro Tips for Demo

- **Have backup:** Deploy to Vercel as backup URL
- **Test beforehand:** Verify robot connection works
- **Show both:** Local interface + robot moving
- **Explain:** 3cm per tile, real-world mapping
- **Highlight:** Professional design, no glitches

## 🚀 Quick Commands

**Start web interface:**
```bash
start-dev.bat
```

**Start robot server:**
```bash
python robot_server_example.py
```

**Deploy to public URL:**
```bash
deploy-vercel.bat
```

**Build for production:**
```bash
npm run build
```

---

**Everything is saved and ready!** 🎉

Your LeLamp Control Interface is production-ready for your demo!

