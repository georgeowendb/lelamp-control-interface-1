# LeLamp Control Interface

Robot control interface for BoxBots Hackathon 2025 - November 7, 2025

Real-time movement tracking and control for the LeLamp robot.

## Features

- 20×20 grid for precise movement control
- Real-time stats: distance, moves, unique cells visited
- Robot integration via IP or hostname
- Path visualization
- WASD or arrow key controls

## Quick Start

**Run locally:**
```bash
start-dev.bat
```
Then open `http://localhost:5173`

**Connect robot:**
1. Run `python robot_server_example.py` on robot
2. Click "Configuration" in the interface
3. Enter robot IP or hostname
4. Enable robot control

## Share with Team

**Option 1: GitHub**
- Push to GitHub and share the repo link
- They clone and run `npm install` then `npm run dev`

**Option 2: Deploy & Share Link**
- Deploy to Vercel: `deploy-vercel.bat`
- Share the public URL - works instantly for everyone

**Option 3: Built Files**
- Run `npm run build`
- Zip the `dist` folder and share
- They just unzip and open `index.html`

See `SHARE_WITH_TEAM.md` for details.

## Controls

- WASD or Arrow Keys - Move
- Configuration - Set robot connection
- Reset - Reset stats

## Tech

- React + Vite
- Real-time robot communication
- Responsive design
