import React from 'react'
import { Handle, Position } from '@xyflow/react'

// Base Node Component - handles common node structure
export interface BaseNodeProps {
  selected: boolean
  id: string
  handles: Array<{
    type: 'source' | 'target'
    position: Position
    id?: string
    className: string
  }>
  children: React.ReactNode
}

/**
 * Base Node Component - handles common node structure
 * Memoized for performance optimization
 */
export const BaseNode: React.FC<BaseNodeProps> = React.memo(({ selected, handles, children }) => {
  return (
    <div className={`node-container ${selected ? 'selected' : ''}`}>
      {handles.map((handle, index) => (
        <Handle
          key={handle.id || index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          className={handle.className}
        />
      ))}
      {children}
    </div>
  )
})

// Node Symbol Component - handles symbol display
export interface NodeSymbolProps {
  color: 'green' | 'red' | 'blue' | 'orange' | 'purple' | 'pink' | 'teal' | 'slate' | 'indigo'
  size: 'xl' | 'sm' | 'xs'
  children: React.ReactNode
  flexCol?: boolean
}

/**
 * Node Symbol Component - handles symbol display
 * Memoized for performance optimization
 */
export const NodeSymbol: React.FC<NodeSymbolProps> = React.memo(({ color, size, children, flexCol = false }) => {
  return (
    <div className={`node-symbol-base node-symbol-${color} node-symbol-${size} ${flexCol ? 'node-symbol-flex-col' : ''} node-symbol`}>
      {children}
    </div>
  )
})

