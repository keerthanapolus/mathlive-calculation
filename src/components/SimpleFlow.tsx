import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react'
import {
  ReactFlow,
  Controls,
  BaseEdge,
  EdgeLabelRenderer,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeTypes,
  EdgeTypes,
  Handle,
  Position,
  MarkerType,
  useReactFlow,
  ConnectionLineType,
} from '@xyflow/react'
import type { EdgeProps } from '@xyflow/react'
import { Play, Square } from 'lucide-react'
// MathLive types are declared in src/types/mathlive.d.ts

// Helper to check if a handle has a value
const useHandleValue = (nodeId: string, handleId: string | null, type: 'source' | 'target', edges: Edge[]) => {
  const hasValue = useMemo(() => {
    if (!nodeId) {
      return false
    }
    
    if (type === 'source') {
      const edge = edges.find(e => e.source === nodeId && (handleId === null || e.sourceHandle === handleId))
      return edge && edge.label && String(edge.label).trim() !== ''
    } else {
      const edge = edges.find(e => e.target === nodeId && (handleId === null || e.targetHandle === handleId))
      return edge && edge.label && String(edge.label).trim() !== ''
    }
  }, [edges, nodeId, handleId, type])
  
  return hasValue
}

// Node Types
const StartNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const { getEdges } = useReactFlow()
  const edges = getEdges()
  const hasValue = useHandleValue(id, null, 'source', edges)
  return (
    <div className={`h-8 w-8 bg-white border rounded-none flex items-center justify-center relative ${selected ? 'border-red-500 border' : 'border-black border'}`}>
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ 
          background: '#c1fdbf',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            right: '-4px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        <div className="text-green-600 absolute inset-0 flex items-center justify-center leading-none">
          <Play size={16} />
        </div>
    </div>
  )
}

const EndNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const { getEdges } = useReactFlow()
  const edges = getEdges()
  const hasValue = useHandleValue(id, null, 'target', edges)
  return (
    <div className={`h-8 w-8 bg-white border rounded-none flex items-center justify-center relative ${selected ? 'border-red-500 border' : 'border-black border'}`}>
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ 
          background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        <div className="text-red-600 absolute inset-0 flex items-center justify-center leading-none">
          <Square size={16} />
        </div>
    </div>
  )
}

const AddNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const { getEdges } = useReactFlow()
  const edges = getEdges()
  const hasValue1 = useHandleValue(id, 'input1', 'target', edges)
  const hasValue2 = useHandleValue(id, 'input2', 'target', edges)
  const hasOutput = useHandleValue(id, null, 'source', edges)
  return (
    <div className={`h-8 w-8 bg-white border rounded-none flex items-center justify-center relative ${selected ? 'border-red-500 border' : 'border-black border'}`}>
      <Handle 
        type="target" 
        position={Position.Left} 
        id="input1" 
        style={{ 
          background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '25%'
        }}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="input2" 
        style={{ 
          background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '75%'
        }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ 
          background: '#c1fdbf',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            right: '-4px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        <div className="text-blue-600 text-xl font-bold absolute inset-0 flex items-center justify-center leading-none" style={{ display: 'contents' }}>+</div>
    </div>
  )
}

const SubtractNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const { getEdges } = useReactFlow()
  const edges = getEdges()
  const hasValue1 = useHandleValue(id, 'input1', 'target', edges)
  const hasValue2 = useHandleValue(id, 'input2', 'target', edges)
  const hasOutput = useHandleValue(id, null, 'source', edges)
  return (
    <div className={`h-8 w-8 bg-white border rounded-none flex items-center justify-center relative ${selected ? 'border-red-500 border' : 'border-black border'}`}>
      <Handle 
        type="target" 
        position={Position.Left} 
        id="input1" 
        style={{ 
          background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '25%'
        }}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="input2" 
        style={{ 
          background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '75%'
        }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ 
          background: '#c1fdbf',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            right: '-4px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        <div className="text-orange-600 text-xl font-bold absolute inset-0 flex items-center justify-center leading-none" style={{ display: 'contents' }}>-</div>
    </div>
  )
}

const MultiplyNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const { getEdges } = useReactFlow()
  const edges = getEdges()
  const hasValue1 = useHandleValue(id, 'input1', 'target', edges)
  const hasValue2 = useHandleValue(id, 'input2', 'target', edges)
  const hasOutput = useHandleValue(id, null, 'source', edges)
  return (
    <div className={`h-8 w-8 bg-white border rounded-none flex items-center justify-center relative ${selected ? 'border-red-500 border' : 'border-black border'}`}>
      <Handle 
        type="target" 
        position={Position.Left} 
        id="input1" 
        style={{ 
          background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '25%'
        }}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="input2" 
        style={{ 
          background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '75%'
        }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ 
          background: '#c1fdbf',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            right: '-4px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        <div className="text-purple-600 text-xl font-bold absolute inset-0 flex items-center justify-center leading-none" style={{ display: 'contents' }}>×</div>
    </div>
  )
}

const DivideNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const { getEdges } = useReactFlow()
  const edges = getEdges()
  const hasValue1 = useHandleValue(id, 'input1', 'target', edges)
  const hasValue2 = useHandleValue(id, 'input2', 'target', edges)
  const hasOutput = useHandleValue(id, null, 'source', edges)
  return (
    <div className={`h-8 w-8 bg-white border rounded-none flex items-center justify-center relative ${selected ? 'border-red-500 border' : 'border-black border'}`}>
      <Handle 
        type="target" 
        position={Position.Left} 
        id="input1" 
        style={{ 
          background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '25%'
        }}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="input2" 
        style={{ 
          background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '75%'
        }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ 
          background: '#c1fdbf',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            right: '-4px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        <div className="text-pink-600 text-xl font-bold absolute inset-0 flex items-center justify-center leading-none" style={{ display: 'contents' }}>÷</div>
    </div>
  )
}

// New math block components matching the image
const PowerNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const { getEdges } = useReactFlow()
  const edges = getEdges()
  const hasValue1 = useHandleValue(id, 'input1', 'target', edges)
  const hasValue2 = useHandleValue(id, 'input2', 'target', edges)
  const hasOutput = useHandleValue(id, null, 'source', edges)
  return (
    <div className={`h-8 w-8 bg-white border rounded-none flex items-center justify-center relative ${selected ? 'border-red-500 border' : 'border-black border'}`}>
        <Handle 
          type="target" 
          position={Position.Left} 
          id="input1" 
          style={{ 
            background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '25%'
          }}
        />
        <Handle 
          type="target" 
          position={Position.Left} 
          id="input2" 
          style={{ 
            background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '75%'
          }}
        />
        <Handle 
          type="source" 
          position={Position.Right} 
          style={{ 
            background: '#c1fdbf',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            right: '-4px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        <div className="text-green-600 text-sm font-bold absolute inset-0 flex items-center justify-center leading-none">
          <span>p</span><sup className="text-xs">2</sup>
        </div>
    </div>
  )
}

const SquareRootNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const { getEdges } = useReactFlow()
  const edges = getEdges()
  const hasValue1 = useHandleValue(id, 'input1', 'target', edges)
  const hasOutput = useHandleValue(id, null, 'source', edges)
  return (
    <div className={`h-8 w-8 bg-white border rounded-none flex items-center justify-center relative ${selected ? 'border-red-500 border' : 'border-black border'}`}>
        <Handle 
          type="target" 
          position={Position.Left} 
          id="input1" 
          style={{ 
            background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        <Handle 
          type="source" 
          position={Position.Right} 
          style={{ 
            background: '#c1fdbf',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            right: '-4px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        <div className="text-green-600 text-xl font-bold absolute inset-0 flex items-center justify-center leading-none" style={{ display: 'contents' }}>√</div>
    </div>
  )
}

const EqualNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const { getEdges } = useReactFlow()
  const edges = getEdges()
  const hasValue1 = useHandleValue(id, 'input1', 'target', edges)
  const hasValue2 = useHandleValue(id, 'input2', 'target', edges)
  const hasOutput = useHandleValue(id, null, 'source', edges)
  return (
    <div className={`h-8 w-8 bg-white border rounded-none flex items-center justify-center relative ${selected ? 'border-red-500 border' : 'border-black border'}`}>
          <Handle 
            type="target" 
            position={Position.Left} 
            id="input1" 
            style={{ 
              background: '#f4febd',
              border: '1px solid #000',
              width: '8px',
              height: '8px',
              left: '-4px',
              top: '25%'
            }}
          />
          <Handle 
            type="target" 
            position={Position.Left} 
            id="input2" 
            style={{ 
              background: '#f4febd',
              border: '1px solid #000',
              width: '8px',
              height: '8px',
              left: '-4px',
              top: '75%'
            }}
          />
          <Handle 
            type="source" 
            position={Position.Right} 
            style={{ 
              background: '#c1fdbf',
              border: '1px solid #000',
              width: '8px',
              height: '8px',
              right: '-4px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
          <div className="text-teal-600 text-xl font-bold absolute inset-0 flex items-center justify-center leading-none" style={{ display: 'contents' }}>=</div>
      </div>
  )
}

const AssignmentNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const { getEdges } = useReactFlow()
  const edges = getEdges()
  const hasValue1 = useHandleValue(id, 'input1', 'target', edges)
  const hasValue2 = useHandleValue(id, 'input2', 'target', edges)
  const hasOutput = useHandleValue(id, null, 'source', edges)
  return (
    <div className={`h-8 w-8 bg-white border rounded-none flex items-center justify-center relative ${selected ? 'border-red-500 border' : 'border-black border'}`}>
          <Handle 
            type="target" 
            position={Position.Left} 
            id="input1" 
            style={{ 
              background: '#f4febd',
              border: '1px solid #000',
              width: '8px',
              height: '8px',
              left: '-4px',
              top: '25%'
            }}
          />
          <Handle 
            type="target" 
            position={Position.Left} 
            id="input2" 
            style={{ 
              background: '#f4febd',
              border: '1px solid #000',
              width: '8px',
              height: '8px',
              left: '-4px',
              top: '75%'
            }}
          />
          <Handle 
            type="source" 
            position={Position.Right} 
            style={{ 
              background: '#c1fdbf',
              border: '1px solid #000',
              width: '8px',
              height: '8px',
              right: '-4px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
          <div className="text-slate-700 text-xl font-bold absolute inset-0 flex items-center justify-center leading-none" style={{ display: 'contents' }}>↰</div>
      </div>
  )
}

const DerivativeNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const { getEdges } = useReactFlow()
  const edges = getEdges()
  const hasValue1 = useHandleValue(id, 'input1', 'target', edges)
  const hasOutput = useHandleValue(id, null, 'source', edges)
  return (
    <div className={`h-8 w-8 bg-white border rounded-none flex items-center justify-center relative ${selected ? 'border-red-500 border' : 'border-black border'}`}>
          <Handle 
            type="target" 
            position={Position.Left} 
            id="input1" 
            style={{ 
              background: '#f4febd',
              border: '1px solid #000',
              width: '8px',
              height: '8px',
              left: '-4px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
          <div className="text-green-600 text-xs font-bold absolute inset-0 flex flex-col items-center justify-center leading-none">
            <div>dy</div>
            <div className="border-t border-white">dx</div>
          </div>
        </div>
  )
}

const IntegralNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const { getEdges } = useReactFlow()
  const edges = getEdges()
  const hasValue1 = useHandleValue(id, 'input1', 'target', edges)
  const hasOutput = useHandleValue(id, null, 'source', edges)
  return (
    <div className={`h-8 w-8 bg-white border rounded-none flex items-center justify-center relative ${selected ? 'border-red-500 border' : 'border-black border'}`}>
          <Handle 
            type="target" 
            position={Position.Left} 
            id="input1" 
            style={{ 
              background: '#f4febd',
              border: '1px solid #000',
              width: '8px',
              height: '8px',
              left: '-4px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
          <div className="text-blue-600 text-xl font-bold absolute inset-0 flex items-center justify-center leading-none" style={{ display: 'contents' }}>∫</div>
    </div>
  )
}

const SubstituteNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const { getEdges } = useReactFlow()
  const edges = getEdges()
  const hasValue1 = useHandleValue(id, 'input1', 'target', edges)
  const hasValue2 = useHandleValue(id, 'input2', 'target', edges)
  const hasOutput = useHandleValue(id, null, 'source', edges)
  return (
    <div className={`h-8 w-8 bg-white border rounded-none flex items-center justify-center relative ${selected ? 'border-red-500 border' : 'border-black border'}`}>
      <Handle 
        type="target" 
        position={Position.Left} 
        id="input1" 
        style={{ 
          background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '25%'
        }}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="input2" 
        style={{ 
          background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '75%'
        }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ 
          background: '#c1fdbf',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            right: '-4px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        <div className="text-slate-700 text-xs font-bold absolute inset-0 flex items-center justify-center leading-none">Sub</div>
    </div>
  )
}

const CalculateNode = ({ data, selected, id }: { data: any; selected: boolean; id: string }) => {
  const { getEdges } = useReactFlow()
  const edges = getEdges()
  const hasInput = useHandleValue(id, 'input', 'target', edges)
  const hasOutput = useHandleValue(id, null, 'source', edges)
  return (
    <div className={`h-8 w-8 bg-white border rounded-none flex items-center justify-center relative ${selected ? 'border-red-500 border' : 'border-black border'}`}>
      <Handle 
        type="target" 
        position={Position.Left} 
        id="input" 
        style={{ 
          background: '#f4febd',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            left: '-4px',
            top: '50%',
            transform: 'translateY(-50%)'
        }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ 
          background: '#c1fdbf',
            border: '1px solid #000',
            width: '8px',
            height: '8px',
            right: '-4px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
        <div className="text-indigo-600 text-xs font-bold absolute inset-0 flex items-center justify-center leading-none">Cal</div>
    </div>
  )
}


const initialNodes: Node[] = []

const initialEdges: Edge[] = []

const operatorForType: Record<string, string> = {
  add: '+',
  subtract: '-',
  multiply: '×',
  divide: '÷',
  power: '^',
  sqrt: '√',
  equal: '=',
  assignment: '↰',
  derivative: 'd/dx',
  integral: '∫',
  substitute: 'sub',
  calculate: 'calc',
}

// Very small safe evaluator for + - * / and parentheses
function evaluateExpressionString(input: string): number {
  const expr = (input || '').replace(/\s+/g, '')
  if (!/^[-+*/().\d]+$/.test(expr)) return NaN
  try {
    // eslint-disable-next-line no-new-func
    const val = Function(`"use strict"; return (${expr})`)()
    return typeof val === 'number' && isFinite(val) ? val : NaN
  } catch {
    return NaN
  }
}

// Utilities to compute an orthogonal (step) path between source and target
function getStepPathAndLabel(
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
) {
  // Calculate midpoint X for the vertical segment
  const midX = (sourceX + targetX) / 2

  // Orthogonal step path: horizontal -> vertical -> horizontal
  const path = `M ${sourceX},${sourceY} L ${midX},${sourceY} L ${midX},${targetY} L ${targetX},${targetY}`

  // Position label at the start (source), so text grows towards the right
  const labelX = sourceX + 4 // Small offset from the source handle
  const goesDown = targetY > sourceY // true if edge goes downward
  const labelY = sourceY // Base position on the source line

  return { path, labelX, labelY, goesDown }
}

// Read-only math field component for edge labels
const MathEdgeLabel: React.FC<{ latex: string }> = ({ latex }) => {
  const mathFieldRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (mathFieldRef.current) {
      const mathField = mathFieldRef.current as any
      mathField.value = latex
      mathField.readOnly = true
      
      // Inject styles into Shadow DOM to make them work
      const injectStyles = () => {
        const shadowRoot = mathField.shadowRoot
        if (shadowRoot) {
          // Check if style already exists
          const existingStyle = shadowRoot.querySelector('style[data-mathlive-edgelabel]')
          if (!existingStyle) {
            const style = document.createElement('style')
            style.setAttribute('data-mathlive-edgelabel', 'true')
            style.textContent = `
              :host {
                background: transparent !important;
                border: none !important;
                padding: 0 !important;
                font-size: 10px !important;
                font-weight: 400 !important;
                color: #000000 !important;
                display: flex !important;
                flex-direction: column-reverse !important;
                min-width: auto !important;
                pointer-events: none !important;
              }
              .ML__container {
                background: transparent !important;
                border: none !important;
                padding: 0 !important;
                display: flex !important;
                flex-direction: column-reverse !important;
              }
              .ML__base {
                font-size: 10px !important;
                font-weight: 400 !important;
                color: #000000 !important;
              }
            `
            shadowRoot.appendChild(style)
          }
        } else {
          // Retry if shadow root is not ready yet
          setTimeout(injectStyles, 50)
        }
      }
      
      // Inject styles
      injectStyles()
    }
  }, [latex])

  return (
    <math-field
      ref={mathFieldRef as any}
      read-only
      style={{
        background: 'transparent',
        border: 'none',
        padding: '0',
        fontSize: '10px',
        fontWeight: '400',
        color: '#000000',
        display: 'flex',
        flexDirection: 'column-reverse',  
        minWidth: 'auto',
        pointerEvents: 'none',
      }}
    />
  )
}

// Custom step edge with text labels above or below the line - renders LaTeX using MathLive
const MathBezierEdge: React.FC<EdgeProps> = (props) => {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    style,
    markerEnd,
    label,
    targetHandleId,
    selected,
  } = props

  const { path: edgePath, labelX, labelY, goesDown } = getStepPathAndLabel(
    sourceX,
    sourceY,
    targetX,
    targetY,
  )

  // Default: text above the line
  // Exception: If edge goes DOWN (same source with multiple outputs), show text below
  // If going to a specific input handle, always show above
  const hasTargetHandle = targetHandleId && (targetHandleId === 'input1' || targetHandleId === 'input2' || targetHandleId === 'input')
  const showBelow = !hasTargetHandle && goesDown

  const labelStr = label ? String(label) : ''

  // Override stroke color to light grey when selected
  const edgeStyle = selected
    ? { ...style, stroke: '#d3d3d3', strokeWidth: 0.4 }
    : { ...style, stroke: '#000000', strokeWidth: 0.4 }

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={edgeStyle} markerEnd={markerEnd} />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              // Anchored to left, grows towards right when content is added
              transform: showBelow 
                ? `translate(0%, 0%) translate(${labelX}px, ${labelY + 0}px)`
                : `translate(0%, -110%) translate(${labelX}px, ${labelY - 0}px)`,
              pointerEvents: 'all',
              background: 'transparent',
              padding: '0px 2px',
              lineHeight: '1',
              whiteSpace: 'nowrap',
              textAlign: 'left',
            }}
            className="nodrag nopan math-edge-label"
          >
            <MathEdgeLabel latex={labelStr} />
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

const SimpleFlow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [nodeId, setNodeId] = useState(1)
  const [nodeCount, setNodeCount] = useState(0)
  const [computed, setComputed] = useState<{ expr: string; value: number } | null>(null)
  const [expression, setExpression] = useState<string>('')
  const [activeEdgeId, setActiveEdgeId] = useState<string | null>(null)
  const mathFieldRef = useRef<any>(null)

  // Initialize MathLive field
  // Initialize MathLive field
  useEffect(() => {
    if (mathFieldRef.current) {
      const mathField = mathFieldRef.current as any
      mathField.addEventListener('input', (event: any) => {
        setExpression(event.target.value)
      })
      
      // Ensure the field is ready for input
      mathField.smartMode = true
      mathField.smartFence = false // Disabled to prevent duplicate brackets
      mathField.smartSuperscript = true

      // Inject styles into Shadow DOM for internal elements
      const injectStyles = () => {
        const shadowRoot = mathField.shadowRoot
        if (shadowRoot) {
          // Check if style already exists
          const existingStyle = shadowRoot.querySelector('style[data-mathlive-custom]')
          if (!existingStyle) {
            const style = document.createElement('style')
            style.setAttribute('data-mathlive-custom', 'true')
            style.textContent = `
              .ML__container {
                height: 100% !important;
              }
              .ML__toggles {
                align-self: center !important;
              }
              .ML__virtual-keyboard-toggle [title],
              .ML__virtual-keyboard-toggle [data-tooltip],
              .ML__virtual-keyboard-toggle [role="tooltip"],
              .ML__menu-toggle [title],
              .ML__menu-toggle [data-tooltip],
              .ML__menu-toggle [role="tooltip"] {
                z-index: 99999 !important;
                visibility: visible !important;
                opacity: 1 !important;
                pointer-events: auto !important;
              }
            `
            shadowRoot.appendChild(style)
          }
        } else {
          // Retry if shadow root is not ready yet
          setTimeout(injectStyles, 100)
        }
      }
      
      // Try to inject styles immediately, or retry after a short delay
      injectStyles()

      // Add global styles for tooltips that might be rendered outside shadow DOM
      const addGlobalTooltipStyle = () => {
        const globalStyleId = 'mathlive-tooltip-style'
        if (!document.getElementById(globalStyleId)) {
          const globalStyle = document.createElement('style')
          globalStyle.id = globalStyleId
          globalStyle.textContent = `
            /* Tooltips for MathLive virtual keyboard and menu toggles */
            [role="tooltip"],
            [data-tooltip],
            [class*="tooltip"] {
              z-index: 99999 !important;
              visibility: visible !important;
              opacity: 1 !important;
              pointer-events: auto !important;
              position: fixed !important;
            }
          `
          document.head.appendChild(globalStyle)
        }
      }
      addGlobalTooltipStyle()
    }
  }, []) // Only run once on mount

  // Update MathLive field value when expression state changes
  useEffect(() => {
    if (mathFieldRef.current) {
      const mathField = mathFieldRef.current as any
      if (mathField.value !== expression) {
        mathField.value = expression
      }
    }
  }, [expression])

  // Update edge colors based on whether they have values
  const updateEdgeColors = useCallback(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        const hasValue = edge.label && String(edge.label).trim() !== ''
        return {
          ...edge,
          style: {
            stroke: '#000000', // Always black
            strokeWidth: 0.4
          }
        }
      })
    )
  }, [setEdges])

  // Save edges to session storage
  const saveEdgesToSession = useCallback((edges: Edge[]) => {
    try {
      sessionStorage.setItem('flowEdges', JSON.stringify(edges))
    } catch (error) {
      // Error saving to session storage
    }
  }, [])

  // Load edges from session storage
  const loadEdgesFromSession = useCallback(() => {
    try {
      const savedEdges = sessionStorage.getItem('flowEdges')
      if (savedEdges) {
        const parsedEdges = JSON.parse(savedEdges)
        setEdges(parsedEdges)
        return parsedEdges
      }
    } catch (error) {
      // Error loading from session storage
    }
    return []
  }, [setEdges])

  // Create nodeTypes - memoized outside component to avoid recreation
  const nodeTypes: NodeTypes = useMemo(() => ({
    start: StartNode,
    end: EndNode,
    add: AddNode,
    subtract: SubtractNode,
    multiply: MultiplyNode,
    divide: DivideNode,
    power: PowerNode,
    sqrt: SquareRootNode,
    equal: EqualNode,
    assignment: AssignmentNode,
    derivative: DerivativeNode,
    integral: IntegralNode,
    substitute: SubstituteNode,
    calculate: CalculateNode,
  }), [])

  const edgeTypes: EdgeTypes = useMemo(() => ({
    mathBezier: MathBezierEdge,
  }), [])

  const getNode = useCallback((id: string) => nodes.find((n) => n.id === id), [nodes])

  // Helper function to compute the value of a node
  const computeNodeValue = useCallback((nodeId: string): number | null => {
    const node = getNode(nodeId)
    if (!node) return null

    // If it's a start node, return 0
    if (node.type === 'start') return 0

    // For operation nodes, compute their result
    if (node.type === 'add' || node.type === 'subtract' || node.type === 'multiply' || node.type === 'divide') {
      const incomingEdges = edges.filter(e => e.target === nodeId)
      const sortedEdges = incomingEdges.sort((a, b) => (a.targetHandle || '').localeCompare(b.targetHandle || ''))
      
      if (sortedEdges.length >= 2) {
        const leftValue = evaluateExpressionString(String(sortedEdges[0].label || '0'))
        const rightValue = evaluateExpressionString(String(sortedEdges[1].label || '0'))
        
        switch (node.type) {
          case 'add': return leftValue + rightValue
          case 'subtract': return leftValue - rightValue
          case 'multiply': return leftValue * rightValue
          case 'divide': return rightValue === 0 ? NaN : leftValue / rightValue
        }
      }
    }

    return null
  }, [getNode, edges])

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'mathBezier',
            animated: false,
            markerEnd: { type: MarkerType.ArrowClosed, width: 30, height: 30 },
            label: '',
            labelShowBg: false,
            style: { stroke: '#000000', strokeWidth: 0.4 }, // Black by default
          },
          eds,
        ),
      ),
    [setEdges]
  )

  const onEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      // Set the active edge and focus the expression input
      setActiveEdgeId(edge.id)
      
      // Get the current value of just this specific edge
      const currentValue = (edge.label as string) || ''
      
      // Set the expression to just this edge's value
      setExpression(currentValue)
      
      // Focus the MathLive field immediately
      setTimeout(() => {
        if (mathFieldRef.current) {
          const mathField = mathFieldRef.current as any
          mathField.focus()
          // Place cursor at the end of the text
          mathField.executeCommand('moveToEnd')
        }
      }, 50)
    },
    []
  )

  const onEdgeDoubleClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      // Set the active edge and focus the expression input
      setActiveEdgeId(edge.id)
      
      // Get the current value of just this specific edge
      const currentValue = (edge.label as string) || ''
      
      // Set the expression to just this edge's value
      setExpression(currentValue)
      
      // Focus the MathLive field and select all text
      setTimeout(() => {
        if (mathFieldRef.current) {
          const mathField = mathFieldRef.current as any
          mathField.focus()
          mathField.executeCommand('selectAll')
        }
      }, 50)
    },
    []
  )

  const addNode = useCallback((type: string) => {
    const newNode: Node = {
      id: nodeId.toString(),
      type,
      data: {
        label: type === 'calculate' ? 'Cal' : type.charAt(0).toUpperCase() + type.slice(1),
      },
      position: {
        x: 400 + nodeCount * 20,
        y: 300 + nodeCount * 20,
      },
    }
    setNodes((nds) => [...nds, newNode])
    setNodeId((id) => id + 1)
    setNodeCount((count) => count + 1)
  }, [nodeId, setNodes, nodeCount])

  const deleteSelectedNodes = useCallback(() => {
    setNodes((nds) => nds.filter((node) => !node.selected))
  }, [setNodes])

  const clearCanvas = useCallback(() => {
    setNodes([])
    setEdges([])
    setNodeCount(0)
    setComputed(null)
    setActiveEdgeId(null)
    setExpression('')
    // Clear session storage
    try {
      sessionStorage.removeItem('flowEdges')
    } catch (error) {
      // Error clearing session storage
    }
  }, [setNodes, setEdges])

  // Export canvas to JSON
  const exportToJSON = useCallback(() => {
    const canvasData = {
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data,
        selected: node.selected || false,
        // Include any other node properties that should be preserved
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle || null,
        targetHandle: edge.targetHandle || null,
        label: edge.label || '',
        type: edge.type || 'mathBezier',
        style: edge.style || {},
        markerEnd: edge.markerEnd || { type: MarkerType.ArrowClosed, width: 30, height: 30 },
        animated: edge.animated || false,
        // Include any other edge properties that should be preserved
      })),
      nodeId, // To maintain node ID sequence for future additions
      nodeCount,
      version: '1.0', // For future compatibility
      exportedAt: new Date().toISOString()
    }
    
    const dataStr = JSON.stringify(canvasData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `canvas-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [nodes, edges, nodeId, nodeCount])

  // Import canvas from JSON
  const importFromJSON = useCallback(() => {
    // Check if canvas has existing content
    const hasContent = nodes.length > 0 || edges.length > 0
    
    // If canvas has content, show confirmation dialog
    if (hasContent) {
      const shouldReplace = window.confirm(
        'There are already nodes in the canvas. Do you want to replace them with the imported file?'
      )
      
      if (!shouldReplace) {
        // User clicked Cancel, abort import
        return
      }
    }
    
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json,.json'
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      
      // Validate file type - only allow JSON files
      const fileName = file.name.toLowerCase()
      const fileExtension = fileName.substring(fileName.lastIndexOf('.'))
      const isValidJson = fileExtension === '.json' || file.type === 'application/json'
      
      if (!isValidJson) {
        alert('Please select a valid JSON file (.json extension required).')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const canvasData = JSON.parse(event.target?.result as string)
          
          // Validate the imported data structure
          if (canvasData.nodes && Array.isArray(canvasData.nodes) && 
              canvasData.edges && Array.isArray(canvasData.edges)) {
            
            // Restore nodes with all properties
            setNodes(canvasData.nodes.map((node: Node) => ({
              ...node,
              // Ensure all required properties are present
              position: node.position || { x: 0, y: 0 },
              data: node.data || {},
              type: node.type || 'default',
            })))
            
            // Restore edges with all properties including labels (math expressions)
            setEdges(canvasData.edges.map((edge: Edge) => ({
              ...edge,
              // Ensure all required properties are present
              type: edge.type || 'mathBezier',
              label: edge.label || '',
              style: edge.style || { stroke: '#000000', strokeWidth: 0.4 },
              markerEnd: edge.markerEnd || { type: MarkerType.ArrowClosed, width: 30, height: 30 },
              animated: edge.animated || false,
            })))
            
            // Restore node ID counter if available (for future node additions)
            if (canvasData.nodeId && typeof canvasData.nodeId === 'number') {
              setNodeId(canvasData.nodeId)
            }
            
            // Update node count
            if (canvasData.nodeCount && typeof canvasData.nodeCount === 'number') {
              setNodeCount(canvasData.nodeCount)
            } else {
              setNodeCount(canvasData.nodes.length)
            }
            
            // Clear active states
            setActiveEdgeId(null)
            setExpression('')
            setComputed(null)
            
            // Save to session storage
            try {
              sessionStorage.setItem('flowEdges', JSON.stringify(canvasData.edges))
            } catch (error) {
              // Error saving to session storage
            }
            
            alert('Canvas imported successfully!')
          } else {
            alert('Invalid file format. Please ensure the file contains nodes and edges arrays.')
          }
        } catch (error) {
          alert('Error importing file. Please check the file format.')
          console.error('Import error:', error)
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }, [setNodes, setEdges, nodes, edges])

  // Clear active edge when clicking elsewhere
  const onPaneClick = useCallback(() => {
    setActiveEdgeId(null)
  }, [])

  // Save the current expression and clear active edge
  const saveExpression = useCallback(() => {
    if (activeEdgeId && expression.trim()) {
      // Update the edge with the new value and change color to green
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === activeEdgeId) {
            return {
              ...edge,
              label: expression,
              style: {
                stroke: '#000000', // Black color
                strokeWidth: 0.4
              }
            }
          }
          return edge
        })
      )
      
      // Clear the active state and expression
      setActiveEdgeId(null)
      setExpression('')
    }
  }, [activeEdgeId, expression, setEdges])

  const updateDiagramFromExpression = useCallback(() => {
    if (!expression.trim()) {
      return
    }
    
    try {
      // Parse simple expressions like "(7 + 6)" to extract values
      const match = expression.match(/\((\d+(?:\.\d+)?)\s*([+\-*/])\s*(\d+(?:\.\d+)?)\)/)
      if (match) {
        const [, leftValue, operator, rightValue] = match
        
        // Update edges with the parsed values
        setEdges((eds) => {
          // Find the specific operation node based on the operator
          let targetNodeType = ''
          switch (operator) {
            case '+': targetNodeType = 'add'; break
            case '-': targetNodeType = 'subtract'; break
            case '*': targetNodeType = 'multiply'; break
            case '/': targetNodeType = 'divide'; break
          }
          
          if (targetNodeType) {
            // Find edges connected to the specific operation node
            const operationEdges = eds.filter(edge => {
              const targetNode = getNode(edge.target)
              return targetNode && targetNode.type === targetNodeType
            })
            
            // Sort edges by targetHandle to ensure consistent ordering
            const sortedEdges = operationEdges.sort((a, b) => {
              const aHandle = a.targetHandle || ''
              const bHandle = b.targetHandle || ''
              return aHandle.localeCompare(bHandle)
            })
            
            if (sortedEdges.length >= 2) {
              // Create new edge objects with updated labels and colors
              const updatedEdges = eds.map(edge => {
                if (edge.id === sortedEdges[0].id) {
                  return { 
                    ...edge, 
                    label: leftValue,
                    style: {
                      stroke: '#000000', // Always black
                      strokeWidth: 0.4
                    }
                  }
                } else if (edge.id === sortedEdges[1].id) {
                  return { 
                    ...edge, 
                    label: rightValue,
                    style: {
                      stroke: '#000000', // Always black
                      strokeWidth: 0.4
                    }
                  }
                }
                return edge
              })
              return updatedEdges
            }
          }
          
          return eds
        })
      }
    } catch {
      // Could not parse expression for diagram update
    }
  }, [expression, getNode])

  // Update the active edge when expression changes (but don't change color until save)
  useEffect(() => {
    if (activeEdgeId && expression !== undefined) {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === activeEdgeId) {
            return {
              ...edge,
              label: expression,
              style: {
                stroke: '#000000', // Always black
                strokeWidth: 0.4,
                strokeDasharray: 'none'
              }
            }
          }
          return edge
        })
      )
    }
  }, [expression, activeEdgeId, setEdges])

  // Update edge styles to show active edge
  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === activeEdgeId) {
          // Active edge stays red until saved
          return {
            ...edge,
            style: {
              stroke: '#000000',
              strokeWidth: 0.4,
              strokeDasharray: 'none'
            }
          }
        } else {
          // Other edges show green only if they have saved values
          const hasValue = edge.label && String(edge.label).trim() !== ''
          return {
            ...edge,
            style: {
              stroke: '#000000',
              strokeWidth: 0.4,
              strokeDasharray: 'none'
            }
          }
        }
      })
    )
  }, [activeEdgeId, setEdges])

  // Trigger diagram update when expression changes
  useEffect(() => {
    if (expression.trim()) {
      updateDiagramFromExpression()
    }
  }, [expression, updateDiagramFromExpression])

  // Save edges to session storage whenever edges change
  useEffect(() => {
    if (edges.length > 0) {
      saveEdgesToSession(edges)
    }
  }, [edges, saveEdgesToSession])

  // Load edges from session storage on component mount
  useEffect(() => {
    loadEdgesFromSession()
  }, [loadEdgesFromSession])

  const computeExpressionFromInput = useCallback(() => {
    // If there's an expression in the input field, compute from that
    if (expression.trim()) {
      try {
        const value = evaluateExpressionString(expression)
        setComputed({ expr: expression, value })
        return
      } catch (error) {
        alert('Invalid expression. Please check your input.')
        return
      }
    }
    
    // Otherwise, compute from the canvas (visual flow)
    const endNode = nodes.find((n) => n.type === 'end')
    if (!endNode) {
      alert('Please add an End node and connect the flow, or enter an expression to compute.')
      return
    }

    const incomingTo = (targetId: string) => edges.filter((e) => e.target === targetId)

    const evalFromNode = (nodeId: string): { expr: string; value: number } => {
      const node = getNode(nodeId)
      if (!node) return { expr: '0', value: 0 }

      if (node.type === 'add' || node.type === 'subtract' || node.type === 'multiply' || node.type === 'divide' || node.type === 'substitute' || node.type === 'calculate') {
        const inc = incomingTo(node.id)
        const sorted = [...inc].sort((a, b) => (a.targetHandle || '').localeCompare(b.targetHandle || ''))
        const leftEdge = sorted[0]
        const rightEdge = sorted[1]

        const isOp = (id?: string) => (id ? !!(getNode(id)?.type || '').match(/add|subtract|multiply|divide|substitute|calculate/) : false)

        const leftEval = leftEdge
          ? (isOp(leftEdge.source)
              ? evalFromNode(leftEdge.source)
              : { expr: String(leftEdge.label || '0'), value: evaluateExpressionString(String(leftEdge.label || '0')) })
          : { expr: '0', value: 0 }

        const rightEval = node.type === 'calculate'
          ? undefined
          : rightEdge
            ? (isOp(rightEdge.source)
                ? evalFromNode(rightEdge.source)
                : { expr: String(rightEdge.label || '0'), value: evaluateExpressionString(String(rightEdge.label || '0')) })
            : { expr: '0', value: 0 }

        let value = 0
        if (node.type === 'calculate') {
          value = leftEval.value
          return { expr: `${leftEval.expr}`, value }
        }

        switch (node.type) {
          case 'add':
            value = leftEval.value + (rightEval?.value || 0)
            break
          case 'subtract':
            value = leftEval.value - (rightEval?.value || 0)
            break
          case 'multiply':
            value = leftEval.value * (rightEval?.value || 0)
            break
          case 'divide':
            value = (rightEval?.value || 0) === 0 ? NaN : leftEval.value / (rightEval?.value || 0)
            break
          case 'substitute':
            value = rightEval?.value || 0
            break
        }
        return { expr: `(${leftEval.expr} ${operatorForType[node.type]} ${rightEval?.expr})`, value }
      }

      const inc = incomingTo(node.id)
      if (inc.length > 0) {
        const text = String(inc[0].label || '0')
        const val = evaluateExpressionString(text)
        return { expr: text, value: val }
      }
      return { expr: '0', value: 0 }
    }

    const endIncoming = incomingTo(endNode.id)
    if (endIncoming.length === 0) {
      alert('Connect something into the End node to compute.')
      return
    }

    const srcNode = getNode(endIncoming[0].source)
    const result = srcNode ? evalFromNode(srcNode.id) : { expr: String(endIncoming[0].label || '0'), value: evaluateExpressionString(String(endIncoming[0].label || '0')) }

    setComputed(result)
    setExpression(result.expr)
  }, [expression, nodes, edges, getNode])


  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Top Bar - Math Blocks Palette */}
      <div className="h-20 bg-white border-b border-gray-200 flex items-center px-4 overflow-x-auto">
        <div className="flex space-x-3 min-w-max">
          <button onClick={() => addNode('start')} className="flex-shrink-0" title="Start Node">
            <div className="relative">
              <div className="h-12 w-12 bg-slate-200 border border-slate-300 rounded-none flex items-center justify-center relative">
                {/* Output handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ right: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <div className="text-green-600">
                  <Play size={16} />
                </div>
              </div>
            </div>
          </button>
          
          <button onClick={() => addNode('end')} className="flex-shrink-0" title="End Node">
            <div className="relative">
              <div className="h-12 w-12 bg-slate-200 border border-slate-300 rounded-none flex items-center justify-center relative">
                {/* Input handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <div className="text-red-600">
                  <Square size={16} />
                </div>
              </div>
            </div>
          </button>

          <button onClick={() => addNode('add')} className="flex-shrink-0" title="Add Node">
            <div className="relative">
              <div className="h-12 w-12 bg-slate-200 border border-slate-300 rounded-none flex items-center justify-center relative">
                {/* Input handles */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '25%' }}
                />
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '75%' }}
                />
                {/* Output handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ right: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <div className="text-blue-600 text-xl font-bold">+</div>
              </div>
            </div>
          </button>

          <button onClick={() => addNode('subtract')} className="flex-shrink-0" title="Subtract Node">
            <div className="relative">
              <div className="h-12 w-12 bg-slate-200 border border-slate-300 rounded-none flex items-center justify-center relative">
                {/* Input handles */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '25%' }}
                />
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '75%' }}
                />
                {/* Output handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ right: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <div className="text-orange-600 text-xl font-bold">-</div>
              </div>
            </div>
          </button>

          <button onClick={() => addNode('multiply')} className="flex-shrink-0" title="Multiply Node">
            <div className="relative">
              <div className="h-12 w-12 bg-slate-200 border border-slate-300 rounded-none flex items-center justify-center relative">
                {/* Input handles */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '25%' }}
                />
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '75%' }}
                />
                {/* Output handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ right: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <div className="text-purple-600 text-xl font-bold">×</div>
              </div>
            </div>
          </button>

          <button onClick={() => addNode('divide')} className="flex-shrink-0" title="Divide Node">
            <div className="relative">
              <div className="h-12 w-12 bg-slate-200 border border-slate-300 rounded-none flex items-center justify-center relative">
                {/* Input handles */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '25%' }}
                />
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '75%' }}
                />
                {/* Output handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ right: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <div className="text-pink-600 text-xl font-bold">÷</div>
              </div>
            </div>
          </button>

          <button onClick={() => addNode('power')} className="flex-shrink-0" title="Power Node">
            <div className="relative">
              <div className="h-12 w-12 bg-slate-200 border border-slate-300 rounded-none flex items-center justify-center relative">
                {/* Input handles */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '25%' }}
                />
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '75%' }}
                />
                {/* Output handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ right: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <div className="text-green-600 text-sm font-bold">
                  <span>p</span><sup className="text-xs">2</sup>
                </div>
              </div>
            </div>
          </button>

          <button onClick={() => addNode('sqrt')} className="flex-shrink-0" title="Square Root Node">
            <div className="relative">
              <div className="h-12 w-12 bg-slate-200 border border-slate-300 rounded-none flex items-center justify-center relative">
                {/* Input handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                {/* Output handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ right: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <div className="text-green-600 text-xl font-bold">√</div>
              </div>
            </div>
          </button>

          <button onClick={() => addNode('equal')} className="flex-shrink-0" title="Equal Node">
            <div className="relative">
              <div className="h-12 w-12 bg-slate-200 border border-slate-300 rounded-none flex items-center justify-center relative">
                {/* Input handles */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '25%' }}
                />
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '75%' }}
                />
                {/* Output handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ right: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <div className="text-teal-600 text-xl font-bold">=</div>
              </div>
            </div>
          </button>

          <button onClick={() => addNode('assignment')} className="flex-shrink-0" title="Assignment Node">
            <div className="relative">
              <div className="h-12 w-12 bg-slate-200 border border-slate-300 rounded-none flex items-center justify-center relative">
                {/* Input handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                {/* Output handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ right: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <div className="text-slate-700 text-xl font-bold">↰</div>
              </div>
            </div>
          </button>

          <button onClick={() => addNode('derivative')} className="flex-shrink-0" title="Derivative Node">
            <div className="relative">
              <div className="h-12 w-12 bg-slate-200 border border-slate-300 rounded-none flex items-center justify-center relative">
                {/* Input handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                {/* Output handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ right: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <div className="text-green-600 text-xs font-bold">
                  <div>dy</div>
                  <div className="border-t border-white">dx</div>
                </div>
              </div>
            </div>
          </button>

          <button onClick={() => addNode('integral')} className="flex-shrink-0" title="Integral Node">
            <div className="relative">
              <div className="h-12 w-12 bg-slate-200 border border-slate-300 rounded-none flex items-center justify-center relative">
                {/* Input handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                {/* Output handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ right: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <div className="text-blue-600 text-xl font-bold">∫</div>
              </div>
            </div>
          </button>

          <button onClick={() => addNode('substitute')} className="flex-shrink-0" title="Substitute Node">
            <div className="relative">
              <div className="h-12 w-12 bg-slate-200 border border-slate-300 rounded-none flex items-center justify-center relative">
                {/* Input handles */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '25%' }}
                />
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '75%' }}
                />
                {/* Output handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ right: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <div className="text-slate-700 text-xs font-bold">Sub</div>
              </div>
            </div>
          </button>

          <button onClick={() => addNode('calculate')} className="flex-shrink-0" title="Calculate Node">
            <div className="relative">
              <div className="h-12 w-12 bg-slate-200 border border-slate-300 rounded-none flex items-center justify-center relative">
                {/* Input handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ left: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                {/* Output handle */}
                <div 
                  className="absolute w-2 h-2 bg-white border border-black rounded-full"
                  style={{ right: '-4px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <div className="text-indigo-600 text-xs font-bold">Cal</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Central Canvas */}
        <div className="flex-1 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: 'mathBezier' }}
        connectionLineType={ConnectionLineType.Step}
        fitView
        attributionPosition="bottom-left"
        style={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}
      >
        <Controls />
      </ReactFlow>
      
        </div>
        
        {/* Right Side Pane */}
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          
          <div className="space-y-4">
            <div className={`mathlive-section ${activeEdgeId ? 'active' : ''}`}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expression</label>
              <math-field
                ref={mathFieldRef}
                className="w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ 
                  height: 'auto',
                  width: '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  minHeight: '0px',
                  overflow: 'visible',
                  resize: 'none',
                  boxSizing: 'border-box',
                  border: '2px solid #d1d5db',
                  padding: '8px 12px'
                }}
                virtual-keyboard-mode="off"
                value={expression}
              ></math-field>
            </div>

            <div className={`mathlive-section ${activeEdgeId ? 'active' : ''}`}>
              <div className="space-y-2">
                <button 
                  onClick={saveExpression} 
                  disabled={!activeEdgeId || !expression.trim()}
                  className="w-full p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Canvas Actions</div>
              <div className="space-y-2">
                {nodes.some(node => node.selected) && (
                  <button onClick={deleteSelectedNodes} className="w-full p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors">
                    Delete Selected
                  </button>
                )}
                <button onClick={clearCanvas} className="w-full p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors">
                  Clear Canvas
                </button>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Canvas Info</div>
              <div className="text-sm text-gray-500 mb-3">
                Nodes on canvas: {nodes.length}
              </div>
              <div className="border-t border-gray-200 pt-3 mb-2"></div>
              <div className="space-y-2">
                <button 
                  onClick={exportToJSON} 
                  className="w-full p-2.5 bg-green-50 hover:bg-green-100 border-2 border-green-600 text-green-700 rounded-lg transition-all font-semibold shadow-sm hover:shadow-md"
                >
                  Export to JSON
                </button>
                <button 
                  onClick={importFromJSON} 
                  className="w-full p-2.5 bg-blue-50 hover:bg-blue-100 border-2 border-blue-600 text-blue-700 rounded-lg transition-all font-semibold shadow-sm hover:shadow-md"
                >
                  Import from JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleFlow
