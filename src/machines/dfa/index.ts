import type { DFA } from '../../types'

export const dfaPresets: Record<string, DFA> = {
  endsWithA: {
    type: 'DFA',
    name: 'Ends with "a"',
    startState: 'q0',
    finalStates: ['q1'],
    alphabet: ['a', 'b'],
    states: [
      { id: 'q0', position: { x: 120, y: 100 }, isFinal: false, isStart: true },
      { id: 'q1', position: { x: 280, y: 100 }, isFinal: true, isStart: false },
    ],
    transitions: [
      { from: 'q0', to: 'q1', label: 'a' },
      { from: 'q0', to: 'q0', label: 'b' },
      { from: 'q1', to: 'q1', label: 'a' },
      { from: 'q1', to: 'q0', label: 'b' },
    ],
  },
  divisibleBy3: {
    type: 'DFA',
    name: 'Binary: Divisible by 3',
    startState: 'q0',
    finalStates: ['q0'],
    alphabet: ['0', '1'],
    states: [
      { id: 'q0', position: { x: 100, y: 100 }, isFinal: true, isStart: true },
      { id: 'q1', position: { x: 250, y: 50 }, isFinal: false, isStart: false },
      { id: 'q2', position: { x: 250, y: 150 }, isFinal: false, isStart: false },
    ],
    transitions: [
      { from: 'q0', to: 'q0', label: '0' },
      { from: 'q0', to: 'q1', label: '1' },
      { from: 'q1', to: 'q2', label: '0' },
      { from: 'q1', to: 'q0', label: '1' },
      { from: 'q2', to: 'q1', label: '0' },
      { from: 'q2', to: 'q2', label: '1' },
    ],
  },
  evenZeros: {
    type: 'DFA',
    name: 'Even number of 0s',
    startState: 'even',
    finalStates: ['even'],
    alphabet: ['0', '1'],
    states: [
      { id: 'even', position: { x: 120, y: 100 }, isFinal: true, isStart: true },
      { id: 'odd', position: { x: 280, y: 100 }, isFinal: false, isStart: false },
    ],
    transitions: [
      { from: 'even', to: 'odd', label: '0' },
      { from: 'even', to: 'even', label: '1' },
      { from: 'odd', to: 'even', label: '0' },
      { from: 'odd', to: 'odd', label: '1' },
    ],
  },
  containsAba: {
    type: 'DFA',
    name: 'Contains "aba"',
    startState: 'q0',
    finalStates: ['q3'],
    alphabet: ['a', 'b'],
    states: [
      { id: 'q0', position: { x: 80, y: 100 }, isFinal: false, isStart: true },
      { id: 'q1', position: { x: 180, y: 100 }, isFinal: false, isStart: false },
      { id: 'q2', position: { x: 280, y: 100 }, isFinal: false, isStart: false },
      { id: 'q3', position: { x: 380, y: 100 }, isFinal: true, isStart: false },
    ],
    transitions: [
      { from: 'q0', to: 'q0', label: 'b' },
      { from: 'q0', to: 'q1', label: 'a' },
      { from: 'q1', to: 'q2', label: 'b' },
      { from: 'q1', to: 'q1', label: 'a' },
      { from: 'q2', to: 'q3', label: 'a' },
      { from: 'q2', to: 'q0', label: 'b' },
      { from: 'q3', to: 'q3', label: 'a' },
      { from: 'q3', to: 'q3', label: 'b' },
    ],
  },
}
