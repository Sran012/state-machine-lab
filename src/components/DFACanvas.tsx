function DFACanvas() {

    type state = {
        id: string;
        x: number;
        y: number;
        color: string;
    }[]

    const states:state = [
        { id: "q0", x: 120, y: 100, color: "lightyellow" },
        { id: "q1", x: 280, y: 100, color: "lightgreen" },
      ];


    return (
        <svg width="400" height="200" style={{ border: "1px solid black" }}>

            <line
                x1={states[0].x}
                y1={states[0].y}
                x2={states[1].x}
                y2={states[1].y}
                stroke="black"
             />

            {states.map((state) => (
                <g key={state.id}>
                    <circle cx={state.x} cy={state.y} r={30} stroke="black" strokeWidth="2" fill={state.color} />
                    <text x={state.x} y={state.y} textAnchor="middle" dominantBaseline="middle" fontSize="16">
                        {state.id}
                    </text>
                </g>
            ))}
        </svg>
    );
}
  
export default DFACanvas;
