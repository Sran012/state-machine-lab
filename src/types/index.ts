export type MachineType = 'DFA' | 'NFA' | 'ENFA' | 'MEALY' | 'MOORE'

export interface Position {
  x: number
  y: number
}

export interface State {
  id: string
  position: Position
  isFinal: boolean
  isStart: boolean
}

export interface Transition {
  from: string
  to: string
  label: string
}

export interface DFA {
  type: 'DFA'
  name: string
  states: State[]
  transitions: Transition[]
  startState: string
  finalStates: string[]
  alphabet: string[]
}

export interface NFA {
  type: 'NFA'
  name: string
  states: State[]
  transitions: Transition[]
  startState: string
  finalStates: string[]
  alphabet: string[]
}

export interface ENFA {
  type: 'ENFA'
  name: string
  states: State[]
  transitions: Transition[]
  startState: string
  finalStates: string[]
  alphabet: string[]
}

export interface MealyTransition {
  from: string
  to: string
  input: string
  output: string
}

export interface MealyMachine {
  type: 'MEALY'
  name: string
  states: State[]
  transitions: MealyTransition[]
  startState: string
  finalStates: string[]
  inputAlphabet: string[]
  outputAlphabet: string[]
}

export interface MooreTransition {
  from: string
  to: string
  label: string
}

export interface MooreMachine {
  type: 'MOORE'
  name: string
  states: State[]
  transitions: MooreTransition[]
  startState: string
  finalStates: string[]
  stateOutputs: Record<string, string>
  alphabet: string[]
}

export type AnyMachine = DFA | NFA | ENFA | MealyMachine | MooreMachine

export interface ExecutionStep {
  currentState: string
  currentStates?: string[]
  inputIndex: number
  symbol: string
  transition?: Transition
  activeTransitions?: Transition[]
}

export interface ExecutionResult {
  accepted: boolean
  steps: ExecutionStep[]
  output?: string
}
