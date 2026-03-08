import type { Position } from '../types'

export interface ArrowPoints {
  startX: number
  startY: number
  endX: number
  endY: number
}

export function getArrowPoints(from: Position, to: Position, fromRadius: number, toRadius: number): ArrowPoints {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const distance = Math.sqrt(dy * dy + dx * dx)

  if (distance === 0) {
    return {
      startX: from.x,
      startY: from.y,
      endX: to.x,
      endY: to.y,
    }
  }

  const ux = dx / distance
  const uy = dy / distance

  const startX = from.x + ux * fromRadius
  const startY = from.y + uy * fromRadius

  const endX = to.x - ux * toRadius
  const endY = to.y - uy * toRadius

  return { startX, startY, endX, endY }
}

export function getCurvedPath(from: Position, to: Position, offset: number = 50): string {
  const midX = (from.x + to.x) / 2
  const midY = Math.min(from.y, to.y) - offset

  return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`
}

export function isBackwardTransition(from: Position, to: Position): boolean {
  return from.x > to.x
}
