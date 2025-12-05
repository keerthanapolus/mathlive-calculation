/**
 * Constants for node positioning and configuration
 */

export const NODE_POSITION = {
  BASE_X: 400,
  BASE_Y: 300,
  OFFSET: 20,
} as const

export const NODE_TYPES = {
  START: 'start',
  END: 'end',
  ADD: 'add',
  SUBTRACT: 'subtract',
  MULTIPLY: 'multiply',
  DIVIDE: 'divide',
  POWER: 'power',
  SQRT: 'sqrt',
  EQUAL: 'equal',
  ASSIGNMENT: 'assignment',
  DERIVATIVE: 'derivative',
  INTEGRAL: 'integral',
  SUBSTITUTE: 'substitute',
  CALCULATE: 'calculate',
} as const

export type NodeType = typeof NODE_TYPES[keyof typeof NODE_TYPES]

