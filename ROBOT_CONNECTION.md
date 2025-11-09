# Robot Connection Guide

## How It Works

Yes! When you enter the robot's IP or hostname and enable it, it should connect and work automatically.

## Setup Steps

### 1. Start Robot Server

On your robot, run:
```bash
python robot_server_example.py
```

The server will start on port 5000 and show:
```
🚀 LeLamp Robot Server Starting...
📡 Listening for commands from web interface
🌐 Server will be available at: http://0.0.0.0:5000
```

**Note the robot's IP address** (shown in the terminal or check with `ipconfig` / `ifconfig`)

### 2. Configure in Web Interface

1. Click **"Configuration"** button
2. Choose connection type:
   - **IP Address**: Enter robot IP (e.g., `192.168.1.100`)
   - **Hostname**: Enter hostname (e.g., `lelamp.local`)
3. Enter port: `5000` (default)
4. Click **"Robot: OFF"** to turn it **ON**

### 3. Connection Status

The status indicator will show:
- 🟢 **Connected** (green) - Robot is reachable and responding
- 🟡 **Connecting...** (yellow) - Checking connection
- 🔴 **Connection Error** (red) - Can't reach robot
- ⚪ **Disconnected** (gray) - Robot control is disabled

### 4. How It Connects

- **Automatic check**: Every 5 seconds, it checks `/status` endpoint
- **On movement**: Every time you move, it sends command to `/move` endpoint
- **Real-time**: Status updates immediately when connection changes

## Troubleshooting

### Status shows "Connection Error"

**Check:**
1. Robot server is running (`python robot_server_example.py`)
2. IP/hostname is correct
3. Port is correct (default: 5000)
4. Both devices on same network
5. Firewall allows port 5000

**Test manually:**
```bash
curl http://ROBOT_IP:5000/status
```
Should return: `{"connected": true, "status": "ready"}`

### Commands not reaching robot

**Check:**
1. Status shows "Connected" (green)
2. Robot server console shows incoming requests
3. Check browser console for errors (F12)

### Hostname not working

**Try:**
1. Use IP address instead
2. Check if mDNS/Bonjour is enabled on robot
3. Verify hostname resolves: `ping lelamp.local`

## What Gets Sent

When you move, the interface sends:
```json
{
  "command": "forward" | "backward" | "left" | "right",
  "position": {"x": 0, "y": 0},
  "gridX": 0,
  "gridY": 0,
  "realWorldX": 0,  // in cm
  "realWorldY": 0,  // in cm
  "timestamp": 1234567890
}
```

## Robot Server Endpoints

Your robot server needs these endpoints:

- **GET `/status`** - Check if robot is online
- **POST `/move`** - Receive movement commands

The example server (`robot_server_example.py`) has both.

## Quick Test

1. Start robot server
2. Enter IP in web interface
3. Enable robot control
4. Status should turn green
5. Press arrow key
6. Check robot server console - should show command received

**That's it!** If status is green, it's working. 🎉


