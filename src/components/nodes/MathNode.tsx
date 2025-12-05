import React from 'react'
import { Position } from '@xyflow/react'
import { BaseNode, NodeSymbol } from './BaseNode'

// Handle configuration type
export interface HandleConfig {
  type: 'source' | 'target'
  position: Position
  id?: string
  className: string
}

// Symbol configuration type
export interface SymbolConfig {
  type: 'text' | 'icon' | 'custom'
  color?: 'green' | 'red' | 'blue' | 'orange' | 'purple' | 'pink' | 'teal' | 'slate' | 'indigo'
  size?: 'xl' | 'sm' | 'xs'
  content?: React.ReactNode
  flexCol?: boolean
}

// Math Node Props
export interface MathNodeProps {
  selected: boolean
  id: string
  handles: HandleConfig[]
  symbol: SymbolConfig
}

/**
 * Generic Math Node Component
 * Memoized for performance optimization
 */
export const MathNode: React.FC<MathNodeProps> = React.memo(({ selected, id, handles, symbol }) => {
  const renderSymbol = () => {
    switch (symbol.type) {
      case 'text':
        return (
          <NodeSymbol color={symbol.color!} size={symbol.size!} flexCol={symbol.flexCol}>
            {symbol.content}
          </NodeSymbol>
        )
      case 'icon':
        return <div className={`node-symbol-base node-symbol-${symbol.color}`}>{symbol.content}</div>
      case 'custom':
        return <>{symbol.content}</>
      default:
        return null
    }
  }

  return (
    <BaseNode selected={selected} id={id} handles={handles}>
      {renderSymbol()}
    </BaseNode>
  )
})

// Predefined handle configurations for common patterns
export const HANDLE_PATTERNS = {
  // Single output (right)
  OUTPUT_ONLY: [
    { type: 'source' as const, position: Position.Right, className: 'handle-output handle-right-center' }
  ],
  // Single input (left center)
  INPUT_ONLY: [
    { type: 'target' as const, position: Position.Left, className: 'handle-input handle-left-center' }
  ],
  // Single input + output
  INPUT_OUTPUT: [
    { type: 'target' as const, position: Position.Left, id: 'input1', className: 'handle-input-left-center' },
    { type: 'source' as const, position: Position.Right, className: 'handle-output-right-center' }
  ],
  // Two inputs + output (binary operations)
  BINARY_OPERATION: [
    { type: 'target' as const, position: Position.Left, id: 'input1', className: 'handle-input handle-left-top' },
    { type: 'target' as const, position: Position.Left, id: 'input2', className: 'handle-input handle-left-bottom' },
    { type: 'source' as const, position: Position.Right, className: 'handle-output handle-right-center' }
  ],
  // Two inputs + output (alternative className pattern)
  BINARY_OPERATION_ALT: [
    { type: 'target' as const, position: Position.Left, id: 'input1', className: 'handle-input-left-top' },
    { type: 'target' as const, position: Position.Left, id: 'input2', className: 'handle-input-left-bottom' },
    { type: 'source' as const, position: Position.Right, className: 'handle-output-right-center' }
  ],
  // Input with custom id
  INPUT_CUSTOM: (inputId: string) => [
    { type: 'target' as const, position: Position.Left, id: inputId, className: 'handle-input-left-center' },
    { type: 'source' as const, position: Position.Right, className: 'handle-output handle-right-center' }
  ]
}

