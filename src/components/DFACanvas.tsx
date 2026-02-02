import {useState} from "react";
import { getArrowPoints } from "../utils/arrow";

function DFACanvas() {
    const [CurrentState, setCurrentState] = useState<string>("q0");

    const startState = "q0";
    const finalStates = ["q1"];


    type state = {
        id: string;
        x: number;
        y: number;
        color: string;
        radius: number;
    }[];

    type Transition = {
        from: string;
        to: string;
        label: string;
    };

    const states:state = [
        { id: "q0", x: 120, y: 100, color: "lightyellow", radius: 30 },
        { id: "q1", x: 280, y: 100, color: "lightyellow", radius: 30 },
      ];

    const transitions: Transition[] = [
      { from: "q0", to: "q1", label: "a" },
    ];

    const getState = (id: string) =>
        states.find((s) => s.id === id)!;
      

    return (
        <svg width="400" height="200" style={{ border: "1px solid black" }}>

            <defs>
              <marker
                id="arrow"
                markerWidth="30"
                markerHeight="30"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 Z" fill="black" />
              </marker>
            </defs>

            {states.map((state) => {
              if (state.id !== startState) return null;
              return (
                <line
                  key="start-arrow"
                  x1={state.x - state.radius - 30}
                  y1={state.y}
                  x2={state.x - state.radius}
                  y2={state.y}
                  stroke="black"
                  markerEnd="url(#arrow)"
                />
                );
              })}

            {transitions.map((t,i)=> {
                const from = getState(t.from);
                const to = getState(t.to);

                const { startX, startY, endX, endY } = getArrowPoints(from, to);

                return (
                    <g key={i}>
                        <line
                          x1={startX}
                          y1={startY}
                          x2={endX}
                          y2={endY}
                          stroke="black"
                          markerEnd="url(#arrow)"
                        />
                        <text
                          x={(from.x + to.x) / 2}
                          y={from.y - 10}
                          textAnchor="middle"
                          fontSize="14"
                        >
                          {t.label}
                        </text>
                    </g>
                );
            })}

            {states.map((state) => (
                <g key={state.id}
                    onClick={() => setCurrentState(state.id)}
                    style={{ cursor: "pointer" }}>
                    <circle cx={state.x} cy={state.y} r={30} stroke="black" strokeWidth="2" fill={state.id === CurrentState ? "orange" : state.color} />
                    {finalStates.includes(state.id) && (
                      <circle
                        cx={state.x}
                        cy={state.y}
                        r={state.radius - 5}
                        stroke="black"
                        strokeWidth="2"
                        fill="none"
                      />
                    )}
                    <text x={state.x} y={state.y} textAnchor="middle" dominantBaseline="middle" fontSize="16">
                        {state.id}
                    </text>
                </g>
            ))}
        </svg>
    );
}
  
export default DFACanvas;
