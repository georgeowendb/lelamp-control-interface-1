import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

const BOARD_SIZE = 20 // 20x20 grid (positions 0-19 = 20 cells each direction)
const CELL_SIZE = 50
const TILE_SIZE_CM = 3

// Robot configuration - can be changed in UI
const getStoredValue = (key, defaultValue) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem(key) || defaultValue
  }
  return defaultValue
}

// Global handler to prevent duplicate listeners in StrictMode
let globalHandler = null
let isProcessing = false

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [moves, setMoves] = useState(0)
  const [distance, setDistance] = useState(0)
  const [robotEnabled, setRobotEnabled] = useState(getStoredValue('robotEnabled', 'false') === 'true')
  const [connectionType, setConnectionType] = useState(getStoredValue('connectionType', 'ip') || 'ip')
  const [robotIP, setRobotIP] = useState(getStoredValue('robotIP', '192.168.1.100'))
  const [robotHostname, setRobotHostname] = useState(getStoredValue('robotHostname', 'lelamp.local'))
  const [robotPort, setRobotPort] = useState(getStoredValue('robotPort', '5000'))
  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [showConfig, setShowConfig] = useState(false)
  const [movementPath, setMovementPath] = useState([{ x: 0, y: 0 }])
  const [uniqueCellsSet, setUniqueCellsSet] = useState(new Set(['0,0']))
  const [hoveredCell, setHoveredCell] = useState(null)
  
  const positionRef = useRef({ x: 0, y: 0 })
  const boardRef = useRef(null)
  const markerRef = useRef(null)

  // Update refs when state changes
  useEffect(() => {
    positionRef.current = position
  }, [position])

  // Get robot address (hostname or IP)
  const getRobotAddress = useCallback(() => {
    return connectionType === 'hostname' ? robotHostname : robotIP
  }, [connectionType, robotIP, robotHostname])

  // Send command to robot
  const sendRobotCommand = useCallback(async (command, newX, newY) => {
    if (!robotEnabled) return

    const realWorldX = newX * TILE_SIZE_CM
    const realWorldY = newY * TILE_SIZE_CM
    const robotAddress = getRobotAddress()

    try {
      const response = await fetch(`http://${robotAddress}:${robotPort}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command,
          position: { x: newX, y: newY },
          gridX: newX,
          gridY: newY,
          realWorldX,
          realWorldY,
          timestamp: Date.now()
        }),
        signal: AbortSignal.timeout(2000)
      })

      if (response.ok) {
        setConnectionStatus('connected')
      } else {
        setConnectionStatus('error')
      }
    } catch (error) {
      setConnectionStatus('error')
    }
  }, [robotEnabled, getRobotAddress, robotPort])

  const handleMove = useCallback((newX, newY, direction) => {
    if (isProcessing) return
    isProcessing = true

    const prevPos = positionRef.current
    if (prevPos.x === newX && prevPos.y === newY) {
      isProcessing = false
      return
    }

    // Update position and path
    setPosition({ x: newX, y: newY })
    setMovementPath(prev => {
      const newPath = [...prev, { x: newX, y: newY }]
      return newPath.slice(-30) // Keep last 30 moves for visualization
    })
    // Track unique cells (never loses track, even if path is trimmed)
    setUniqueCellsSet(prev => {
      const newSet = new Set(prev)
      newSet.add(`${newX},${newY}`)
      return newSet
    })
    setMoves(m => m + 1)
    setDistance(d => d + TILE_SIZE_CM)

    // Send command to robot
    sendRobotCommand(direction, newX, newY)

    setTimeout(() => {
      isProcessing = false
    }, 30)
  }, [sendRobotCommand])

  // Optimized path checking with useMemo (for visualization)
  const pathSet = useMemo(() => {
    return new Set(movementPath.map(p => `${p.x},${p.y}`))
  }, [movementPath])

  // Count unique cells visited (from permanent set)
  const uniqueCellsVisited = uniqueCellsSet.size

  // Keyboard handler
  useEffect(() => {
    if (globalHandler) {
      window.removeEventListener('keydown', globalHandler)
    }

    globalHandler = (e) => {
      const key = e.key.toLowerCase()
      if (!['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        return
      }
      
      e.preventDefault()
      e.stopPropagation()
      
      const currentPos = positionRef.current
      let newX = currentPos.x
      let newY = currentPos.y
      let direction = null

      switch (key) {
        case 'arrowup':
        case 'w':
          if (currentPos.y > 0) {
            newY = currentPos.y - 1
            direction = 'forward'
          }
          break
        case 'arrowdown':
        case 's':
          if (currentPos.y < BOARD_SIZE - 1) {
            newY = currentPos.y + 1
            direction = 'backward'
          }
          break
        case 'arrowleft':
        case 'a':
          if (currentPos.x > 0) {
            newX = currentPos.x - 1
            direction = 'left'
          }
          break
        case 'arrowright':
        case 'd':
          if (currentPos.x < BOARD_SIZE - 1) {
            newX = currentPos.x + 1
            direction = 'right'
          }
          break
      }

      if (newX !== currentPos.x || newY !== currentPos.y) {
        handleMove(newX, newY, direction)
      }
    }

    window.addEventListener('keydown', globalHandler)
    return () => {
      if (globalHandler) {
        window.removeEventListener('keydown', globalHandler)
        globalHandler = null
      }
    }
  }, [handleMove])

  // Check robot connection status
  useEffect(() => {
    if (!robotEnabled) {
      setConnectionStatus('disconnected')
      return
    }

    const checkConnection = async () => {
      try {
        const robotAddress = getRobotAddress()
        const response = await fetch(`http://${robotAddress}:${robotPort}/status`, {
          signal: AbortSignal.timeout(2000)
        })
        setConnectionStatus(response.ok ? 'connected' : 'error')
      } catch {
        setConnectionStatus('error')
      }
    }

    checkConnection()
    const interval = setInterval(checkConnection, 5000)
    return () => clearInterval(interval)
  }, [robotEnabled, getRobotAddress, robotPort])

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('robotEnabled', robotEnabled.toString())
    localStorage.setItem('connectionType', connectionType)
    localStorage.setItem('robotIP', robotIP)
    localStorage.setItem('robotHostname', robotHostname)
    localStorage.setItem('robotPort', robotPort)
  }, [robotEnabled, connectionType, robotIP, robotHostname, robotPort])

  // Disabled auto-scroll to prevent glitching - user can scroll manually

  const handleReset = () => {
    setPosition({ x: 0, y: 0 })
    setMoves(0)
    setDistance(0)
    setMovementPath([{ x: 0, y: 0 }])
    setUniqueCellsSet(new Set(['0,0']))
    positionRef.current = { x: 0, y: 0 }
    if (boardRef.current) {
      boardRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  const realWorldX = position.x * TILE_SIZE_CM
  const realWorldY = position.y * TILE_SIZE_CM

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return '#4ade80'
      case 'connecting': return '#fbbf24'
      case 'error': return '#f87171'
      default: return '#9ca3af'
    }
  }

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Connected'
      case 'connecting': return 'Connecting...'
      case 'error': return 'Connection Error'
      default: return 'Disconnected'
    }
  }

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>LeLamp Control</h1>
          <div className="subtitle">Robot Navigation Interface</div>
        </div>

        <div className="robot-controls">
          <div className="robot-status">
            <div className="status-indicator" style={{ backgroundColor: getStatusColor() }}></div>
            <span className="status-text">{getStatusText()}</span>
          </div>
          <button 
            className={`robot-toggle ${robotEnabled ? 'enabled' : ''}`}
            onClick={() => setRobotEnabled(!robotEnabled)}
          >
            {robotEnabled ? 'Robot: ON' : 'Robot: OFF'}
          </button>
          <button className="config-button" onClick={() => setShowConfig(!showConfig)}>
            Configuration
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {showConfig && (
          <div className="config-panel">
            <div className="config-header">
              <h3>Robot Configuration</h3>
              <button className="close-config" onClick={() => setShowConfig(false)}>×</button>
            </div>
            <div className="config-item">
              <label>Connection Type:</label>
              <div className="connection-type-selector">
                <button 
                  className={`type-button ${connectionType === 'ip' ? 'active' : ''}`}
                  onClick={() => setConnectionType('ip')}
                >
                  IP Address
                </button>
                <button 
                  className={`type-button ${connectionType === 'hostname' ? 'active' : ''}`}
                  onClick={() => setConnectionType('hostname')}
                >
                  Hostname
                </button>
              </div>
            </div>
            {connectionType === 'ip' ? (
              <div className="config-item">
                <label>Robot IP:</label>
                <input 
                  type="text" 
                  value={robotIP} 
                  onChange={(e) => setRobotIP(e.target.value)}
                  placeholder="192.168.1.100"
                />
              </div>
            ) : (
              <div className="config-item">
                <label>Robot Hostname:</label>
                <input 
                  type="text" 
                  value={robotHostname} 
                  onChange={(e) => setRobotHostname(e.target.value)}
                  placeholder="lelamp.local"
                />
              </div>
            )}
            <div className="config-item">
              <label>Robot Port:</label>
              <input 
                type="text" 
                value={robotPort} 
                onChange={(e) => setRobotPort(e.target.value)}
                placeholder="5000"
              />
            </div>
            <div className="config-footer">
              <div className="config-hint">
                {connectionType === 'ip' 
                  ? 'Use IP address for direct connection (e.g., 192.168.1.100)'
                  : 'Use hostname for mDNS/Bonjour (e.g., lelamp.local)'}
              </div>
            </div>
          </div>
        )}
        
        <div className="controls-hint">
          <div className="key-hint">
            <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>
            <span>or</span>
            <kbd>↑</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd>
          </div>
          <p>Use arrow keys or WASD to move</p>
        </div>
        
        <div className="board-container">
          <div className="board-header">
            <span className="grid-size-indicator">Grid: {BOARD_SIZE}×{BOARD_SIZE}</span>
          </div>
          <div className="board" ref={boardRef}>
            {Array.from({ length: BOARD_SIZE }).map((_, row) => (
            <div key={row} className="row">
                {Array.from({ length: BOARD_SIZE }).map((_, col) => {
                  const isMarker = row === position.y && col === position.x
                  const cellKey = `${col},${row}`
                  const isInPath = pathSet.has(cellKey) && !isMarker
                  const isUniqueVisited = uniqueCellsSet.has(cellKey) && !isMarker
                  const prevPath = movementPath[movementPath.length - 2]
                  const isPathEnd = prevPath && prevPath.x === col && prevPath.y === row
                  
                  return (
                    <div
                      key={`${row}-${col}`}
                      className={`cell ${isMarker ? 'marker' : ''} ${isInPath ? 'path' : ''} ${isUniqueVisited && !isInPath ? 'visited' : ''} ${isPathEnd ? 'path-end' : ''}`}
                      onMouseEnter={() => setHoveredCell({ x: col, y: row })}
                      onMouseLeave={() => setHoveredCell(null)}
                      ref={isMarker ? markerRef : null}
                    >
                      {hoveredCell && hoveredCell.x === col && hoveredCell.y === row && !isMarker && (
                        <div className="cell-coords">
                          ({col + 1}, {row + 1})
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          ))}
          </div>
        </div>

        <div className="info-panel">
          <div className="info-card">
            <div className="info-label">Grid Position</div>
            <div className="info-value">({position.x + 1}, {position.y + 1})</div>
          </div>
          <div className="info-card">
            <div className="info-label">Real World Position</div>
            <div className="info-value">{realWorldX}cm × {realWorldY}cm</div>
          </div>
          <div className="info-card highlight">
            <div className="info-label">Total Moves</div>
            <div className="info-value">{moves}</div>
            <div className="info-subtext">keypresses</div>
          </div>
          <div className="info-card highlight">
            <div className="info-label">Distance Traveled</div>
            <div className="info-value">{distance}</div>
            <div className="info-subtext">centimeters</div>
          </div>
          <div className="info-card">
            <div className="info-label">Unique Cells</div>
            <div className="info-value">{uniqueCellsVisited}</div>
            <div className="info-subtext">distinct cells visited</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
