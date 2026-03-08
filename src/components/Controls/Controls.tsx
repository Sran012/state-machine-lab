interface ControlsProps {
  isRunning: boolean
  onPlay: () => void
  onPause: () => void
  onStep: () => void
  onReset: () => void
  canStep: boolean
}

export default function Controls({ isRunning, onPlay, onPause, onStep, onReset, canStep }: ControlsProps) {
  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
      <button onClick={onStep} disabled={!canStep} style={buttonStyle}>
        Step
      </button>
      <button
        onClick={onPlay}
        disabled={isRunning}
        style={{ ...buttonStyle, ...primaryButtonStyle }}
      >
        ▶ Play
      </button>
      <button
        onClick={onPause}
        disabled={!isRunning}
        style={buttonStyle}
      >
        ⏸ Pause
      </button>
      <button onClick={onReset} style={buttonStyle}>
        ↺ Reset
      </button>
    </div>
  )
}

const buttonStyle: React.CSSProperties = {
  padding: '8px 16px',
  fontSize: '14px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  background: 'white',
  cursor: 'pointer',
  transition: 'all 0.2s',
}

const primaryButtonStyle: React.CSSProperties = {
  background: '#3b82f6',
  color: 'white',
  border: 'none',
}
