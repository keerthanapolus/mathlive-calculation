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
  MarkerType,
  ConnectionLineType,
} from '@xyflow/react'
import type { EdgeProps } from '@xyflow/react'
import { MATHLIVE_EDGELABEL_CSS, MATHLIVE_CUSTOM_CSS } from '../utils/shadowDomStyles'
import { saveEdgesToSession, loadEdgesFromSession, clearEdgesFromSession } from '../utils/storageUtils'
import { downloadJSON, readJSONFile, selectJSONFile } from '../utils/fileUtils'
import { handleError, handleWarning } from '../utils/errorHandler'
import { MathNode, HandleConfig } from './nodes/MathNode'
import { NODE_CONFIGS } from './nodes/nodeConfig'
import { ToolbarButton } from './toolbar/ToolbarButton'
import { TOOLBAR_BUTTONS } from './toolbar/toolbarConfig'
import { NodeComponentProps } from '../types/nodeTypes'
import { MathFieldElement } from '../types/mathlive'
import { NODE_POSITION, NODE_TYPES } from '../constants/nodeConstants'
// Import math-field type declarations
import '../types/mathlive.d'

// Helper function to get CSS variable value
const getCSSVariable = (variableName: string): string => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
  }
  return ''
}

// Edge style constants - using CSS variables from index.css
// These reference CSS custom properties defined in :root
const getEdgeStyles = () => {
  const strokeWidth = parseFloat(getCSSVariable('--edge-stroke-width')) || 0.4
  return {
    DEFAULT_EDGE_STYLE: { 
      stroke: getCSSVariable('--edge-stroke-default') || '#000000', 
      strokeWidth 
    },
    SELECTED_EDGE_STYLE: { 
      stroke: getCSSVariable('--edge-stroke-selected') || '#ef4444', 
      strokeWidth 
    },
    EDGE_STYLE_WITH_DASH: { 
      stroke: getCSSVariable('--edge-stroke-default') || '#000000', 
      strokeWidth, 
      strokeDasharray: getCSSVariable('--edge-stroke-dasharray') || 'none' 
    }
  }
}

// Initialize edge styles (will be computed on first render)
const edgeStyles = getEdgeStyles()
const DEFAULT_EDGE_STYLE = edgeStyles.DEFAULT_EDGE_STYLE
const SELECTED_EDGE_STYLE = edgeStyles.SELECTED_EDGE_STYLE
const EDGE_STYLE_WITH_DASH = edgeStyles.EDGE_STYLE_WITH_DASH

/**
 * Creates a node component based on the provided node type
 * @param nodeType - The type of node to create
 * @returns A React component for the specified node type
 */
const createNodeComponent = (nodeType: string) => {
  return ({ selected, id }: NodeComponentProps) => {
    const config = NODE_CONFIGS[nodeType]
    if (!config) {
      handleWarning(`No configuration found for node type: ${nodeType}`, 'createNodeComponent')
      return null
    }
  return (
      <MathNode
        selected={selected}
        id={id}
        handles={config.handles as HandleConfig[]}
        symbol={config.symbol}
      />
    )
  }
}

// Node Types - created from configuration
const StartNode = createNodeComponent('start')
const EndNode = createNodeComponent('end')
const AddNode = createNodeComponent('add')
const SubtractNode = createNodeComponent('subtract')
const MultiplyNode = createNodeComponent('multiply')
const DivideNode = createNodeComponent('divide')
const PowerNode = createNodeComponent('power')
const SquareRootNode = createNodeComponent('sqrt')
const EqualNode = createNodeComponent('equal')
const AssignmentNode = createNodeComponent('assignment')
const DerivativeNode = createNodeComponent('derivative')
const IntegralNode = createNodeComponent('integral')
const SubstituteNode = createNodeComponent('substitute')
const CalculateNode = createNodeComponent('calculate')


const initialNodes: Node[] = []

const initialEdges: Edge[] = []

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

/**
 * Read-only math field component for edge labels
 * Displays LaTeX expressions using MathLive
 */
const MathEdgeLabel: React.FC<{ latex: string }> = ({ latex }) => {
  const mathFieldRef = useRef<MathFieldElement>(null)

  useEffect(() => {
    const mathField = mathFieldRef.current
    if (!mathField) return

      mathField.value = latex
      mathField.readOnly = true
      
      // Inject styles into Shadow DOM to make them work
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    
      const injectStyles = () => {
        const shadowRoot = mathField.shadowRoot
        if (shadowRoot) {
          // Check if style already exists
          const existingStyle = shadowRoot.querySelector('style[data-mathlive-edgelabel]')
          if (!existingStyle) {
            const style = document.createElement('style')
            style.setAttribute('data-mathlive-edgelabel', 'true')
          style.textContent = MATHLIVE_EDGELABEL_CSS
            shadowRoot.appendChild(style)
          }
        } else {
          // Retry if shadow root is not ready yet
        timeoutId = setTimeout(injectStyles, 50)
        }
      }
      
      // Inject styles
      injectStyles()

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [latex])

  return (
    <math-field
      ref={mathFieldRef}
      read-only
      className="mathlive-readonly"
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

  // Override stroke color to red when selected
  const edgeStyle = selected
    ? { ...style, ...SELECTED_EDGE_STYLE }
    : { ...style, ...DEFAULT_EDGE_STYLE }

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={edgeStyle} markerEnd={markerEnd} />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              // Dynamic transform based on position
              transform: showBelow 
                ? `translate(0%, 0%) translate(${labelX}px, ${labelY + 0}px)`
                : `translate(0%, -110%) translate(${labelX}px, ${labelY - 0}px)`,
            }}
            className="nodrag nopan math-edge-label edge-label-base"
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
  const [expression, setExpression] = useState<string>('')
  const [activeEdgeId, setActiveEdgeId] = useState<string | null>(null)
  const mathFieldRef = useRef<MathFieldElement>(null)

  /**
   * Initialize MathLive field with event listeners and styles
   */
  useEffect(() => {
    const mathField = mathFieldRef.current
    if (!mathField) return

    // Event handler for input changes
    const handleInput = (event: Event) => {
      const target = event.target as MathFieldElement
      setExpression(target.value)
    }

    mathField.addEventListener('input', handleInput)
      
      // Ensure the field is ready for input
      mathField.smartMode = true
      mathField.smartFence = false // Disabled to prevent duplicate brackets
      mathField.smartSuperscript = true

      // Inject styles into Shadow DOM for internal elements
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    
      const injectStyles = () => {
        const shadowRoot = mathField.shadowRoot
        if (shadowRoot) {
          // Check if style already exists
          const existingStyle = shadowRoot.querySelector('style[data-mathlive-custom]')
          if (!existingStyle) {
            const style = document.createElement('style')
            style.setAttribute('data-mathlive-custom', 'true')
          style.textContent = MATHLIVE_CUSTOM_CSS
            shadowRoot.appendChild(style)
          }
        } else {
          // Retry if shadow root is not ready yet
        timeoutId = setTimeout(injectStyles, 100)
        }
      }
      
      // Try to inject styles immediately, or retry after a short delay
      injectStyles()

    // Cleanup function
    return () => {
      mathField.removeEventListener('input', handleInput)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, []) // Only run once on mount

  /**
   * Update MathLive field value when expression state changes
   */
  useEffect(() => {
    const mathField = mathFieldRef.current
    if (mathField && mathField.value !== expression) {
        mathField.value = expression
    }
  }, [expression])

  // Load edges from session storage on mount
  useEffect(() => {
    const savedEdges = loadEdgesFromSession()
    if (savedEdges.length > 0) {
      setEdges(savedEdges)
    }
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
            style: DEFAULT_EDGE_STYLE, // Black by default
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
      const timeoutId = setTimeout(() => {
        const mathField = mathFieldRef.current
        if (mathField) {
          mathField.focus()
          // Place cursor at the end of the text
          mathField.executeCommand('moveToEnd')
        }
      }, 50)
      
      // Note: Timeout cleanup handled by component unmount
      return () => clearTimeout(timeoutId)
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
        const mathField = mathFieldRef.current
        if (mathField) {
          mathField.focus()
          mathField.executeCommand('selectAll')
        }
      }, 50)
    },
    []
  )

  /**
   * Adds a new node to the canvas
   * @param type - The type of node to add
   */
  const addNode = useCallback((type: string) => {
    const newNode: Node = {
      id: nodeId.toString(),
      type,
      data: {
        label: type === NODE_TYPES.CALCULATE ? 'Cal' : type.charAt(0).toUpperCase() + type.slice(1),
      },
      position: {
        x: NODE_POSITION.BASE_X + nodeCount * NODE_POSITION.OFFSET,
        y: NODE_POSITION.BASE_Y + nodeCount * NODE_POSITION.OFFSET,
      },
    }
    setNodes((nds) => [...nds, newNode])
    setNodeId((id) => id + 1)
    setNodeCount((count) => count + 1)
  }, [nodeId, setNodes, nodeCount])

  const deleteSelectedNodes = useCallback(() => {
    // Check if the active edge is being deleted
    const selectedEdges = edges.filter((edge) => edge.selected)
    const isActiveEdgeDeleted = selectedEdges.some((edge) => edge.id === activeEdgeId)
    
    // Delete selected nodes
    setNodes((nds) => nds.filter((node) => !node.selected))
    // Delete selected edges
    setEdges((eds) => eds.filter((edge) => !edge.selected))
    
    // Hide expression box if the active edge was deleted
    if (isActiveEdgeDeleted) {
      setActiveEdgeId(null)
      setExpression('')
    }
  }, [setNodes, setEdges, edges, activeEdgeId])

  const clearCanvas = useCallback(() => {
    setNodes([])
    setEdges([])
    setNodeCount(0)
    setActiveEdgeId(null)
    setExpression('')
    clearEdgesFromSession()
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
      })),
      nodeId,
      nodeCount,
      version: '1.0',
      exportedAt: new Date().toISOString()
    }
    
    const filename = `canvas-export-${new Date().toISOString().split('T')[0]}.json`
    downloadJSON(canvasData, filename)
  }, [nodes, edges, nodeId, nodeCount])

  // Import canvas from JSON
  const importFromJSON = useCallback(async () => {
    // Check if canvas has existing content
    const hasContent = nodes.length > 0 || edges.length > 0
    
    if (hasContent) {
      const shouldReplace = window.confirm(
        'There are already nodes in the canvas. Do you want to replace them with the imported file?'
      )
      if (!shouldReplace) return
    }
    
    try {
      const file = await selectJSONFile()
      const canvasData = await readJSONFile(file)
      
      // Validate the imported data structure
      if (!canvasData.nodes || !Array.isArray(canvasData.nodes) || 
          !canvasData.edges || !Array.isArray(canvasData.edges)) {
        alert('Invalid file format. Please ensure the file contains nodes and edges arrays.')
        return
      }
      
      // Restore nodes
            setNodes(canvasData.nodes.map((node: Node) => ({
              ...node,
              position: node.position || { x: 0, y: 0 },
              data: node.data || {},
              type: node.type || 'default',
            })))
            
      // Restore edges
            setEdges(canvasData.edges.map((edge: Edge) => ({
              ...edge,
              type: edge.type || 'mathBezier',
              label: edge.label || '',
        style: edge.style || DEFAULT_EDGE_STYLE,
              markerEnd: edge.markerEnd || { type: MarkerType.ArrowClosed, width: 30, height: 30 },
              animated: edge.animated || false,
            })))
            
      // Restore node ID counter
            if (canvasData.nodeId && typeof canvasData.nodeId === 'number') {
              setNodeId(canvasData.nodeId)
            }
            
            // Update node count
      setNodeCount(canvasData.nodeCount && typeof canvasData.nodeCount === 'number' 
        ? canvasData.nodeCount 
        : canvasData.nodes.length)
            
            // Clear active states
            setActiveEdgeId(null)
            setExpression('')
            
            // Save to session storage
      saveEdgesToSession(canvasData.edges)
            
            alert('Canvas imported successfully!')
        } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error importing file. Please check the file format.'
      alert(errorMessage)
      handleError(error, 'importFromJSON')
        }
  }, [setNodes, setEdges, nodes, edges])

  // Clear active edge when clicking elsewhere
  const onPaneClick = useCallback(() => {
    setActiveEdgeId(null)
    setExpression('')
  }, [])

  const onNodeClick = useCallback(() => {
    // Hide expression box when a node is selected
    setActiveEdgeId(null)
    setExpression('')
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
              style: DEFAULT_EDGE_STYLE
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
            case '+': targetNodeType = NODE_TYPES.ADD; break
            case '-': targetNodeType = NODE_TYPES.SUBTRACT; break
            case '*': targetNodeType = NODE_TYPES.MULTIPLY; break
            case '/': targetNodeType = NODE_TYPES.DIVIDE; break
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
                    style: DEFAULT_EDGE_STYLE
                  }
                } else if (edge.id === sortedEdges[1].id) {
                  return { 
                    ...edge, 
                    label: rightValue,
                    style: DEFAULT_EDGE_STYLE
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

  // Update the active edge when expression changes
  useEffect(() => {
    if (activeEdgeId && expression !== undefined) {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === activeEdgeId) {
            return {
              ...edge,
              label: expression,
              style: EDGE_STYLE_WITH_DASH
            }
          }
          return edge
        })
      )
    }
  }, [expression, activeEdgeId, setEdges])

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
  }, [edges])



  return (
    <div className="app-container">
      {/* Top Bar - Math Blocks Palette */}
      <div className="toolbar-header">
        <div className="toolbar-buttons-container">
          {TOOLBAR_BUTTONS.map((buttonConfig) => (
            <ToolbarButton
              key={buttonConfig.nodeType}
              onClick={() => addNode(buttonConfig.nodeType)}
              title={buttonConfig.title}
              handles={buttonConfig.handles}
              symbol={buttonConfig.symbol}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Central Canvas */}
        <div className="canvas-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{ type: 'mathBezier' }}
        connectionLineType={ConnectionLineType.Step}
        fitView
        attributionPosition="bottom-left"
        className="react-flow-container"
      >
        <Controls />
      </ReactFlow>
      
        </div>
        
        {/* Right Side Pane */}
        <div className="sidebar">
          
          <div className="sidebar-section">
            <div className={`mathlive-section ${activeEdgeId ? 'active' : ''}`}>
              <label className="form-label">Expression</label>
              <math-field
                ref={mathFieldRef}
                className="mathlive-editable"
                virtual-keyboard-mode="off"
                value={expression}
              ></math-field>
            </div>

            <div className={`mathlive-section ${activeEdgeId ? 'active' : ''}`}>
              <div className="form-section-content-spacing">
                <button 
                  onClick={saveExpression} 
                  disabled={!activeEdgeId || !expression.trim()}
                  className="btn-primary"
                  aria-label="Save expression to edge"
                >
                  Save
                </button>
              </div>
            </div>
            
            <div className="form-section">
              <div className="form-section-title">Canvas Actions</div>
              <div className="form-section-content">
                {(nodes.some(node => node.selected) || edges.some(edge => edge.selected)) && (
                  <button 
                    onClick={deleteSelectedNodes} 
                    className="btn-danger"
                    aria-label="Delete selected nodes and edges"
                  >
                    Delete Selected
                  </button>
                )}
                <button 
                  onClick={clearCanvas} 
                  className="btn-secondary"
                  aria-label="Clear entire canvas"
                >
                  Clear Canvas
                </button>
              </div>
            </div>
            
            <div className="form-section">
              <div className="form-section-title">Canvas Info</div>
              <div className="form-info">
                Nodes on canvas: {nodes.length}
              </div>
              <div className="form-divider"></div>
              <div className="form-section-content">
                <button 
                  onClick={exportToJSON} 
                  className="btn-export"
                  aria-label="Export canvas to JSON file"
                >
                  Export to JSON
                </button>
                <button 
                  onClick={importFromJSON} 
                  className="btn-import"
                  aria-label="Import canvas from JSON file"
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
