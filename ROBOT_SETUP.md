# LeLamp Robot Setup Guide

## How the Web Interface Controls Your Robot

### Overview
The web interface sends movement commands to your LeLamp robot over the network. Each tile movement in the game corresponds to a 3cm movement in real life.

### Communication Flow

```
Web Browser (Game Interface)
    ↓
    | HTTP POST or WebSocket
    ↓
Robot Server (Python/Node.js/etc)
    ↓
    | Motor Control Commands
    ↓
Physical Robot Motors
    ↓
Robot Moves 3cm in Real Life
```

### What Happens When You Press Arrow Keys

1. **User presses W/A/S/D or Arrow Keys** in the web interface
2. **Web interface calculates new position** (e.g., move from (5,5) to (5,4))
3. **Command is sent to robot** via HTTP POST or WebSocket:
   ```json
   {
     "command": "forward",
     "position": {"x": 5, "y": 4},
     "gridX": 5,
     "gridY": 4,
     "realWorldX": 15,  // 5 tiles × 3cm = 15cm
     "realWorldY": 12,  // 4 tiles × 3cm = 12cm
     "timestamp": 1234567890
   }
   ```
4. **Robot receives command** and executes movement:
   - `forward` → Move forward 3cm
   - `backward` → Move backward 3cm
   - `left` → Turn left 90°, then move forward 3cm
   - `right` → Turn right 90°, then move forward 3cm
   - `stop` → Stop all motors

### Setup Steps

#### 1. Configure the Web Interface

Edit `browsergame/src/App.jsx` and update:
```javascript
const ROBOT_IP = "192.168.1.100"  // Your robot's IP address
const ROBOT_PORT = 5000            // Your robot's port
```

#### 2. Set Up Robot Server

**Option A: Use the Python Example**
```bash
# On your robot, install dependencies
pip install flask flask-cors

# Run the server
python robot_server_example.py
```

**Option B: Use Node.js/Express**
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/move', (req, res) => {
  const { command, realWorldX, realWorldY } = req.body;
  // Execute movement command
  executeMovement(command, realWorldX, realWorldY);
  res.json({ status: 'success' });
});

app.listen(5000, '0.0.0.0');
```

#### 3. Implement Robot Movement

You need to implement the actual motor control. Examples:

**Raspberry Pi with GPIO:**
```python
import RPi.GPIO as GPIO
from motor_control import MotorController

motors = MotorController()

def execute_movement(command, x_cm, y_cm):
    if command == "forward":
        motors.move_forward(3)  # 3cm
    elif command == "backward":
        motors.move_backward(3)
    elif command == "left":
        motors.turn_left(90)
        motors.move_forward(3)
    elif command == "right":
        motors.turn_right(90)
        motors.move_forward(3)
```

**Arduino/ESP32:**
```cpp
void executeMovement(String command, float x_cm, float y_cm) {
  if (command == "forward") {
    moveForward(3);  // 3cm
  } else if (command == "backward") {
    moveBackward(3);
  } else if (command == "left") {
    turnLeft(90);
    moveForward(3);
  } else if (command == "right") {
    turnRight(90);
    moveForward(3);
  }
}
```

### Movement Specifications

- **Each tile = 3cm** in real life
- **One keypress = one tile movement = 3cm** physical movement
- **Grid coordinates** map to real-world positions:
  - Position (0, 0) = (0cm, 0cm)
  - Position (5, 3) = (15cm, 9cm)
  - Position (10, 10) = (30cm, 30cm)

### Network Requirements

1. **Robot and computer must be on the same network**
2. **Robot must have a static IP** or you need to update ROBOT_IP each time
3. **Firewall must allow port 5000** (or your chosen port)
4. **CORS enabled** on robot server (for web browser access)

### Testing

1. **Start robot server** on your robot
2. **Open web interface** in browser
3. **Check connection status** (should show "Connected" when server is running)
4. **Press arrow keys** and watch:
   - Web interface updates position
   - Robot server receives commands (check console)
   - Physical robot moves 3cm per keypress

### Troubleshooting

**Connection shows "Disconnected":**
- Check robot server is running
- Verify ROBOT_IP is correct
- Check firewall settings
- Test with: `curl http://ROBOT_IP:5000/status`

**Commands not executing:**
- Check robot server console for received commands
- Verify `execute_movement()` function is implemented
- Test motor control separately

**Robot moves wrong distance:**
- Adjust motor speed/duration in `execute_movement()`
- Calibrate: measure actual movement vs expected 3cm
- Fine-tune motor control code

### Advanced: WebSocket Support

For real-time bidirectional communication, implement WebSocket on port 5001:

```python
from flask_socketio import SocketIO, emit

socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def handle_connect():
    emit('status', {'connected': True})

@socketio.on('command')
def handle_command(data):
    execute_movement(data['command'], data['realWorldX'], data['realWorldY'])
```

Then update web interface to use WebSocket (already implemented, just uncomment).

