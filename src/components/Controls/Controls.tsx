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
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onStep}
        disabled={!canStep}
        className={`
          px-3 py-1.5 rounded-lg text-xs font-medium
          border border-zinc-700
          ${canStep 
            ? 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700' 
            : 'bg-zinc-900/50 text-zinc-600 cursor-not-allowed'
          }
        `}
      >
        step
      </button>
      
      <button
        onClick={onPlay}
        disabled={isRunning}
        className={`
          px-3 py-1.5 rounded-lg text-xs font-medium
          ${isRunning 
            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
            : 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
          }
        `}
      >
        ▶ run
      </button>
      
      <button
        onClick={onPause}
        disabled={!isRunning}
        className={`
          px-3 py-1.5 rounded-lg text-xs font-medium
          border border-zinc-700
          ${!isRunning 
            ? 'bg-zinc-900/50 text-zinc-600 cursor-not-allowed' 
            : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700'
          }
        `}
      >
        ⏸ stop
      </button>
      
      <button
        onClick={onReset}
        className="
          px-3 py-1.5 rounded-lg text-xs font-medium
          bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700
        "
      >
        ↺ reset
      </button>
    </div>
  )
}
