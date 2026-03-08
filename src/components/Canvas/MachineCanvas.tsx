import type { DFA, Transition, State } from '../../types'
import { getArrowPoints, isBackwardTransition, getCurvedPath } from '../../utils/arrow'

interface MachineCanvasProps {
  machine: DFA
  currentState: string
  activeTransition: Transition | null
}

const STATE_RADIUS = 30

export default function MachineCanvas({ machine, currentState, activeTransition }: MachineCanvasProps) {
  const getState = (id: string): State | undefined => machine.states.find((s) => s.id === id)

  return (
    <svg width="450" height="220" style={{ border: '1px solid #ccc', borderRadius: '8px', background: '#fafafa' }}>
      <defs>
        <marker
          id="arrow"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
        >
          <path d="M0,0 L12,6 L0,12 Z" fill="#333" />
        </marker>
        <marker
          id="arrow-active"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
        >
          <path d="M0,0 L12,6 L0,12 Z" fill="#f97316" />
        </marker>
      </defs>

      {machine.states.map((state) => {
        if (!state.isStart) return null
        const s = getState(state.id)
        return (
          <g key={`start-${state.id}`}>
            <line
              x1={s!.position.x - STATE_RADIUS - 40}
              y1={s!.position.y}
              x2={s!.position.x - STATE_RADIUS}
              y2={s!.position.y}
              stroke="#333"
              strokeWidth={2}
              markerEnd="url(#arrow)"
            />
            <text
              x={s!.position.x - STATE_RADIUS - 50}
              y={s!.position.y - 10}
              fontSize="12"
              fill="#666"
            >
              start
            </text>
          </g>
        )
      })}

      {machine.transitions.map((t, i) => {
        const from = getState(t.from)
        const to = getState(t.to)

        if (!from || !to) return null

        const isSelfLoop = t.from === t.to
        const isBackward = isBackwardTransition(from.position, to.position)

        const isActive =
          activeTransition &&
          activeTransition.from === t.from &&
          activeTransition.to === t.to &&
          activeTransition.label === t.label

        const strokeColor = isActive ? '#f97316' : '#333'
        const strokeWidth = isActive ? 3 : 2

        if (isSelfLoop) {
          return (
            <g key={i}>
              <ellipse
                cx={from.position.x}
                cy={from.position.y - 40}
                rx={20}
                ry={15}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                markerEnd={`url(#${isActive ? 'arrow-active' : 'arrow'})`}
              />
              <text
                x={from.position.x}
                y={from.position.y - 55}
                textAnchor="middle"
                fontSize="14"
                fontWeight={isActive ? 'bold' : 'normal'}
                fill={strokeColor}
              >
                {t.label}
              </text>
            </g>
          )
        }

        if (isBackward) {
          const path = getCurvedPath(from.position, to.position, 60)
          return (
            <g key={i}>
              <path
                d={path}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                markerEnd={`url(#${isActive ? 'arrow-active' : 'arrow'})`}
              />
              <text
                x={(from.position.x + to.position.x) / 2}
                y={Math.min(from.position.y, to.position.y) - 45}
                textAnchor="middle"
                fontSize="14"
                fontWeight={isActive ? 'bold' : 'normal'}
                fill={strokeColor}
              >
                {t.label}
              </text>
            </g>
          )
        }

        const { startX, startY, endX, endY } = getArrowPoints(
          from.position,
          to.position,
          STATE_RADIUS,
          STATE_RADIUS
        )

        return (
          <g key={i}>
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              markerEnd={`url(#${isActive ? 'arrow-active' : 'arrow'})`}
            />
            <text
              x={(startX + endX) / 2}
              y={(startY + endY) / 2 - 10}
              textAnchor="middle"
              fontSize="14"
              fontWeight={isActive ? 'bold' : 'normal'}
              fill={strokeColor}
            >
              {t.label}
            </text>
          </g>
        )
      })}

      {machine.states.map((state) => (
        <g key={state.id}>
          <circle
            cx={state.position.x}
            cy={state.position.y}
            r={STATE_RADIUS}
            stroke="#333"
            strokeWidth={2}
            fill={state.id === currentState ? '#fed7aa' : '#fef3c7'}
          />
          {state.isFinal && (
            <circle
              cx={state.position.x}
              cy={state.position.y}
              r={STATE_RADIUS - 6}
              stroke="#333"
              strokeWidth={2}
              fill="none"
            />
          )}
          <text
            x={state.position.x}
            y={state.position.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
            fontWeight="bold"
          >
            {state.id}
          </text>
        </g>
      ))}
    </svg>
  )
}
