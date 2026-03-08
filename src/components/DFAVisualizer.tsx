import { useState, useEffect, useCallback } from 'react'
import type { DFA, Transition } from '../types'
import { dfaPresets } from '../machines/dfa'
import { step, getActiveTransition, isAccepting } from '../engines/dfaEngine'
import MachineCanvas from './Canvas/MachineCanvas'
import TransitionTable from './TransitionTable/TransitionTable'
import InputPanel from './InputPanel/InputPanel'
import Controls from './Controls/Controls'

export default function DFAVisualizer() {
  const [selectedKey, setSelectedKey] = useState<keyof typeof dfaPresets>('endsWithA')
  const [machine, setMachine] = useState<DFA>(dfaPresets.endsWithA)
  const [input, setInput] = useState('')
  const [currentState, setCurrentState] = useState(machine.startState)
  const [inputIndex, setInputIndex] = useState(0)
  const [activeTransition, setActiveTransition] = useState<Transition | null>(null)
  const [result, setResult] = useState<'ACCEPT' | 'REJECT' | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    setCurrentState(machine.startState)
    setInputIndex(0)
    setActiveTransition(null)
    setResult(null)
    setIsRunning(false)
  }, [machine])

  const handleStep = useCallback(() => {
    if (inputIndex >= input.length) {
      setIsRunning(false)
      return
    }

    const transition = getActiveTransition(machine, { currentState, inputIndex }, input)

    if (!transition) {
      setActiveTransition(null)
      setResult('REJECT')
      setIsRunning(false)
      return
    }

    setActiveTransition(transition)
    const nextState = step(machine, { currentState, inputIndex }, input)

    if (nextState) {
      setCurrentState(nextState.currentState)
      setInputIndex(nextState.inputIndex)

      if (nextState.inputIndex >= input.length) {
        setIsRunning(false)
        if (isAccepting(machine, nextState.currentState)) {
          setResult('ACCEPT')
        } else {
          setResult('REJECT')
        }
      }
    }
  }, [machine, currentState, inputIndex, input])

  useEffect(() => {
    if (!isRunning) return
    if (inputIndex >= input.length) {
      setIsRunning(false)
      return
    }

    const timer = setTimeout(() => {
      handleStep()
    }, 800)

    return () => clearTimeout(timer)
  }, [isRunning, inputIndex, input, handleStep])

  const handleReset = () => {
    setInput('')
    setInputIndex(0)
    setCurrentState(machine.startState)
    setActiveTransition(null)
    setResult(null)
    setIsRunning(false)
  }

  const handlePresetChange = (key: keyof typeof dfaPresets) => {
    setSelectedKey(key)
    setMachine(dfaPresets[key])
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setInputIndex(0)
    setCurrentState(machine.startState)
    setActiveTransition(null)
    setResult(null)
  }

  const canStep = input.length > 0 && inputIndex < input.length && !result

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
        DFA Visualizer
      </h1>

      <select
        value={selectedKey}
        onChange={(e) => handlePresetChange(e.target.value as keyof typeof dfaPresets)}
        style={selectStyle}
      >
        {Object.entries(dfaPresets).map(([key, preset]) => (
          <option key={key} value={key}>
            {preset.name}
          </option>
        ))}
      </select>

      <MachineCanvas
        machine={machine}
        currentState={currentState}
        activeTransition={activeTransition}
      />

      <TransitionTable
        machine={machine}
        currentState={currentState}
        activeTransitionLabel={activeTransition?.label || null}
      />

      <InputPanel
        input={input}
        onInputChange={handleInputChange}
        currentIndex={inputIndex}
        isRunning={isRunning}
      />

      <Controls
        isRunning={isRunning}
        onPlay={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onStep={handleStep}
        onReset={handleReset}
        canStep={canStep}
      />

      {result && (
        <div
          style={{
            marginTop: '16px',
            padding: '12px 20px',
            fontWeight: 'bold',
            fontSize: '18px',
            color: result === 'ACCEPT' ? '#16a34a' : '#dc2626',
            border: `2px solid ${result === 'ACCEPT' ? '#16a34a' : '#dc2626'}`,
            borderRadius: '8px',
            width: 'fit-content',
          }}
        >
          {result}
        </div>
      )}
    </div>
  )
}

const selectStyle: React.CSSProperties = {
  padding: '8px 12px',
  fontSize: '16px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  marginBottom: '16px',
  width: '100%',
  maxWidth: '300px',
}
