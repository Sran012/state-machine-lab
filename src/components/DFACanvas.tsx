import { useEffect, useState } from "react";
import { getArrowPoints } from "../utils/arrow";

function DFACanvas() {
  const startState = "q0";
  const finalStates = ["q1"];

  const [Input, setInput] = useState<string>("");
  const [Index, setIndex] = useState<number>(0);
  const [CurrentState, setCurrentState] = useState<string>(startState);
  const [activeTransition, setActiveTransition] = useState<Transition | null>(null);
  const [result, setResult] = useState<"ACCEPT" | "REJECT" | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (Index === Input.length && Input.length > 0) {
      if (finalStates.includes(CurrentState)) {
        setResult("ACCEPT");
      }
      else {
        setResult("REJECT");
      }
    }
  }, [Index, Input, CurrentState]);

  useEffect(() => {
    if (!isRunning) return;

    if (Index >= Input.length) {
      setIsRunning(false);
      return;
    }

    const timer = setTimeout(() => {
      step();
    }, 800); // speed (ms)

    return () => clearTimeout(timer);
  }, [isRunning, Index, Input, CurrentState]);



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

  const states: state = [
    { id: "q0", x: 120, y: 100, color: "lightyellow", radius: 30 },
    { id: "q1", x: 280, y: 100, color: "lightyellow", radius: 30 },
    { id: "qd", x: 200, y: 160, color: "red", radius: 20 },
  ];

  const transitions: Transition[] = [
    { from: "q0", to: "q1", label: "a" },
    { from: "q1", to: "q0", label: "b" },
    { from: "qd", to: "qd", label: "a" },
    { from: "qd", to: "qd", label: "b" },
  ];

  const getState = (id: string) =>
    states.find((s) => s.id === id)!;

  const step = () => {
    if (Index >= Input.length) return;

    const symbol = Input[Index];

    const transition = transitions.find(
      (t) => t.from === CurrentState && t.label === symbol
    );

    if (!transition) {
      setActiveTransition(null);
      setCurrentState("qd");
      setIndex(Index + 1);
      return;
    }

    setActiveTransition(transition);
    setCurrentState(transition.to);
    setIndex(Index + 1);

  };



  return (
    <>
      <div>
        <div style={{ display: "inline-flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            value={Input}
            onChange={(e) => {
              setInput(e.target.value);
              setIndex(0);
              setCurrentState(startState);
              setActiveTransition(null);
              setResult(null);
            }}
            placeholder="Enter string"
            disabled={isRunning}
            style={{ border: "1px solid black", padding: "4px 8px 4px 8px", borderRadius: "6px" }}
          />
          <button onClick={step} style={{ padding: "4px 8px 4px 8px" }}>Step</button>
        </div>
        <br></br>
        <div style={{ display: "inline-flex", gap: "8px", marginTop: "8px", marginBottom: "8px" }}>
          <button onClick={() => setIsRunning(true)} disabled={isRunning} style={{ padding: "4px 8px 4px 8px" }}>
            ▶ Play
          </button>

          <button onClick={() => setIsRunning(false)} disabled={!isRunning} style={{ padding: "4px 8px 4px 8px" }}>
            ⏸ Pause
          </button>
        </div>
      </div>


      {result && (
        <div
          style={{
            marginTop: "10px",
            padding: "8px",
            fontWeight: "bold",
            color: result === "ACCEPT" ? "green" : "red",
            border: `2px solid ${result === "ACCEPT" ? "green" : "red"}`,
            width: "fit-content",
          }}
        >
          {result}
        </div>
      )}


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

        {transitions.map((t, i) => {
          const from = getState(t.from);
          const to = getState(t.to);
          const isBackward = from.x > to.x;

          const { startX, startY, endX, endY } = getArrowPoints(from, to);

          const isActive = activeTransition && activeTransition.from === t.from && activeTransition.to === t.to && activeTransition.label === t.label;


          return (
            <g key={i}>
              {/* <line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="black"
                markerEnd="url(#arrow)"
              /> */}
              {!isBackward ? (
                // STRAIGHT ARROW
                <>
                  <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke={isActive ? "orange" : "black"}
                    strokeWidth={isActive ? 3 : 1.5}
                    markerEnd="url(#arrow)"
                  />
                  <text
                    x={(startX + endX) / 2}
                    y={(startY + endY) / 2 - 8}
                    textAnchor="middle"
                    fontSize="14"
                    fill={isActive ? "orange" : "black"}
                  >
                    {t.label}
                  </text>
                </>
              ) : (
                // CURVED ARROW (BACKWARD)
                <>
                  <path
                    d={`
                      M ${startX} ${startY}
                      Q ${(startX + endX) / 2} ${startY - 60}
                      ${endX} ${endY}
                    `}
                    fill="none"
                    stroke={isActive ? "orange" : "black"}
                    strokeWidth={isActive ? 3 : 1.5}
                    markerEnd="url(#arrow)"
                  />
                  <text
                    x={(startX + endX) / 2}
                    y={startY - 40}
                    textAnchor="middle"
                    fontSize="14"
                    fill={isActive ? "orange" : "black"}
                  >
                    {t.label}
                  </text>
                </>)}
            </g>
          );
        })}

        {states.map((state) => (
          <g key={state.id}
            onClick={() => setCurrentState(state.id)}
            style={{ cursor: "pointer" }}>
            <circle cx={state.x} cy={state.y} r={state.radius} stroke="black" strokeWidth="2" fill={state.id === CurrentState ? "orange" : state.color} />
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

    </>
  );
}

export default DFACanvas;
