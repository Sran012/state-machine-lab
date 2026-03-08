interface InputPanelProps {
  input: string
  onInputChange: (value: string) => void
  currentIndex: number
  isRunning: boolean
}

export default function InputPanel({ input, onInputChange, currentIndex, isRunning }: InputPanelProps) {
  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          disabled={isRunning}
          placeholder="Enter input string..."
          style={inputStyle}
        />
      </div>

      {input.length > 0 && (
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {input.split('').map((char, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                padding: '6px 10px',
                borderBottom: i === currentIndex ? '3px solid #f97316' : '3px solid transparent',
                color: i < currentIndex ? '#9ca3af' : '#1f2937',
                fontWeight: i === currentIndex ? 'bold' : 'normal',
                fontSize: '18px',
                background: i === currentIndex ? '#ffedd5' : 'transparent',
                borderRadius: '4px',
              }}
            >
              {char}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  padding: '8px 12px',
  fontSize: '16px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  width: '250px',
  outline: 'none',
}
