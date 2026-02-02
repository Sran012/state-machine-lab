function DFACanvas() {
    return (
    <svg width="400" height="200" style={{ border: "1px solid black" }}>
      <g>
        <circle cx="120" cy="100" r="30" fill="lightblue" />
        <text x="120" y="105" textAnchor="middle">
          q0
        </text>
      </g>

      <g>
        <circle cx="280" cy="100" r="30" fill="lightgreen" />
        <text x="280" y="105" textAnchor="middle">
          q1
        </text>
      </g>
    </svg>
    );
  }
  
  export default DFACanvas;
