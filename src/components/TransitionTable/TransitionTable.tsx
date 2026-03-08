import type { DFA } from '../../types'

interface TransitionTableProps {
  machine: DFA
  currentState: string
  activeTransitionLabel: string | null
}

export default function TransitionTable({ machine, currentState, activeTransitionLabel }: TransitionTableProps) {
  return (
    <table style={{ borderCollapse: 'collapse', marginTop: '16px', fontSize: '14px' }}>
      <thead>
        <tr>
          <th style={thStyle}>State</th>
          {machine.alphabet.map((sym) => (
            <th key={sym} style={thStyle}>
              {sym}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {machine.states.map((state) => (
          <tr
            key={state.id}
            style={{
              background: state.id === currentState ? '#ffedd5' : 'transparent',
            }}
          >
            <td style={tdStyle}>
              <strong>
                {state.id}
                {state.isFinal && <span style={{ color: '#16a34a', marginLeft: '4px' }}>✓</span>}
              </strong>
            </td>
            {machine.alphabet.map((sym) => {
              const transition = machine.transitions.find(
                (t) => t.from === state.id && t.label === sym
              )
              const target = transition ? transition.to : '—'

              const isActive =
                activeTransitionLabel === sym && state.id === currentState

              return (
                <td
                  key={sym}
                  style={{
                    ...tdStyle,
                    background: isActive ? '#f97316' : 'transparent',
                    color: isActive ? 'white' : 'inherit',
                    fontWeight: isActive ? 'bold' : 'normal',
                  }}
                >
                  {target}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const thStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px 16px',
  background: '#f3f4f6',
  textAlign: 'center',
}

const tdStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px 16px',
  textAlign: 'center',
}
