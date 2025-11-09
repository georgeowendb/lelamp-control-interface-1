"""
LeLamp Robot Server Example
This is a simple example of what your LeLamp robot needs to run to receive commands
from the web interface.

Install dependencies:
    pip install flask flask-cors

Run this on your robot:
    python robot_server_example.py

Then update ROBOT_IP in browsergame/src/App.jsx to your robot's IP address.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from the web interface

# Robot state
robot_position = {"x": 0, "y": 0}
robot_connected = False

@app.route('/move', methods=['POST'])
def move():
    """
    Receives movement commands from the web interface.
    
    Expected JSON:
    {
        "command": "forward" | "backward" | "left" | "right" | "stop",
        "position": {"x": 0, "y": 0},
        "gridX": 0,
        "gridY": 0,
        "realWorldX": 0,  // in cm
        "realWorldY": 0,  // in cm
        "timestamp": 1234567890
    }
    """
    global robot_position, robot_connected
    
    try:
        data = request.json
        command = data.get('command')
        position = data.get('position', {})
        real_world_x = data.get('realWorldX', 0)  # cm
        real_world_y = data.get('realWorldY', 0)  # cm
        
        robot_connected = True
        robot_position = position
        
        print(f"🤖 Received command: {command}")
        print(f"   Grid position: ({position.get('x')}, {position.get('y')})")
        print(f"   Real world: ({real_world_x}cm, {real_world_y}cm)")
        
        # TODO: Implement actual robot movement here
        # Example:
        # if command == "forward":
        #     move_forward(3)  # Move 3cm forward
        # elif command == "backward":
        #     move_backward(3)  # Move 3cm backward
        # elif command == "left":
        #     turn_left(90)  # Turn 90 degrees left, then move forward 3cm
        # elif command == "right":
        #     turn_right(90)  # Turn 90 degrees right, then move forward 3cm
        # elif command == "stop":
        #     stop_motors()
        
        # For now, just simulate the movement
        execute_movement(command, real_world_x, real_world_y)
        
        return jsonify({
            "status": "success",
            "command": command,
            "position": position,
            "message": f"Command '{command}' executed"
        }), 200
        
    except Exception as e:
        print(f"❌ Error processing command: {e}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

@app.route('/status', methods=['GET'])
def status():
    """Returns the current robot status."""
    return jsonify({
        "connected": robot_connected,
        "position": robot_position,
        "status": "ready"
    }), 200

@app.route('/location', methods=['GET'])
def location():
    """Returns the current robot location (for syncing with web interface)."""
    return jsonify({
        "x": robot_position.get('x', 0),
        "y": robot_position.get('y', 0)
    }), 200

def execute_movement(command, x_cm, y_cm):
    """
    Execute the actual robot movement.
    Replace this with your actual robot control code.
    
    Example implementations:
    - Raspberry Pi with GPIO motors
    - Arduino with motor drivers
    - ESP32 with WiFi and motors
    - Any other robot platform
    """
    print(f"   Executing: {command} to position ({x_cm}cm, {y_cm}cm)")
    
    # Example: If using a motor library
    # from motor_control import MotorController
    # motors = MotorController()
    # 
    # if command == "forward":
    #     motors.move_forward(3)  # 3cm
    # elif command == "backward":
    #     motors.move_backward(3)  # 3cm
    # elif command == "left":
    #     motors.turn_left(90)
    #     motors.move_forward(3)
    # elif command == "right":
    #     motors.turn_right(90)
    #     motors.move_forward(3)
    # elif command == "stop":
    #     motors.stop()
    
    # For demonstration, just print what would happen
    movement_map = {
        "forward": "Move forward 3cm",
        "backward": "Move backward 3cm",
        "left": "Turn left 90°, then move forward 3cm",
        "right": "Turn right 90°, then move forward 3cm",
        "stop": "Stop all motors"
    }
    
    action = movement_map.get(command, "Unknown command")
    print(f"   Action: {action}")

if __name__ == '__main__':
    print("🚀 LeLamp Robot Server Starting...")
    print("📡 Listening for commands from web interface")
    print("🌐 Server will be available at: http://0.0.0.0:5000")
    print("\n⚠️  Make sure to:")
    print("   1. Update ROBOT_IP in browsergame/src/App.jsx to this robot's IP")
    print("   2. Implement execute_movement() with your actual robot hardware")
    print("   3. Test the connection from the web interface\n")
    
    # Run on all interfaces (0.0.0.0) so it's accessible from other devices
    app.run(host='0.0.0.0', port=5000, debug=True)

