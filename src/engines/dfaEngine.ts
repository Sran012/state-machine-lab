import type { DFA, Transition, ExecutionStep, ExecutionResult } from '../types'

export interface DFAExecutionState {
  currentState: string
  inputIndex: number
}

export function createInitialState(dfa: DFA): DFAExecutionState {
  return {
    currentState: dfa.startState,
    inputIndex: 0,
  }
}

export function step(dfa: DFA, state: DFAExecutionState, input: string): DFAExecutionState | null {
  const { currentState, inputIndex } = state

  if (inputIndex >= input.length) {
    return null
  }

  const symbol = input[inputIndex]

  const transition = dfa.transitions.find(
    (t) => t.from === currentState && t.label === symbol
  )

  if (!transition) {
    return null
  }

  return {
    currentState: transition.to,
    inputIndex: inputIndex + 1,
  }
}

export function getActiveTransition(dfa: DFA, state: DFAExecutionState, input: string): Transition | null {
  const { currentState, inputIndex } = state

  if (inputIndex >= input.length) {
    return null
  }

  const symbol = input[inputIndex]

  return dfa.transitions.find(
    (t) => t.from === currentState && t.label === symbol
  ) || null
}

export function isAccepting(dfa: DFA, state: string): boolean {
  return dfa.finalStates.includes(state)
}

export function run(dfa: DFA, input: string): ExecutionResult {
  const steps: ExecutionStep[] = []
  let currentState = dfa.startState

  for (let i = 0; i < input.length; i++) {
    const symbol = input[i]

    const transition = dfa.transitions.find(
      (t) => t.from === currentState && t.label === symbol
    )

    steps.push({
      currentState,
      inputIndex: i,
      symbol,
      transition: transition || undefined,
    })

    if (!transition) {
      return {
        accepted: false,
        steps,
      }
    }

    currentState = transition.to
  }

  steps.push({
    currentState,
    inputIndex: input.length,
    symbol: '',
  })

  return {
    accepted: isAccepting(dfa, currentState),
    steps,
  }
}

export function getTransitionTable(dfa: DFA): Record<string, Record<string, string>> {
  const table: Record<string, Record<string, string>> = {}

  for (const state of dfa.states) {
    table[state.id] = {}
    for (const symbol of dfa.alphabet) {
      const transition = dfa.transitions.find(
        (t) => t.from === state.id && t.label === symbol
      )
      table[state.id][symbol] = transition ? transition.to : '—'
    }
  }

  return table
}
