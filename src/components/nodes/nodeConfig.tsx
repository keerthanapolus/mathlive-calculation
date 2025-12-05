import { Play, Square } from 'lucide-react'
import { HANDLE_PATTERNS, SymbolConfig } from './MathNode'

// Node configuration type
export interface NodeConfig {
  handles: typeof HANDLE_PATTERNS[keyof typeof HANDLE_PATTERNS] | ReturnType<typeof HANDLE_PATTERNS.INPUT_CUSTOM>
  symbol: SymbolConfig
}

// Node configurations map
export const NODE_CONFIGS: Record<string, NodeConfig> = {
  start: {
    handles: HANDLE_PATTERNS.OUTPUT_ONLY,
    symbol: { type: 'icon', color: 'green', content: <Play size={16} /> }
  },
  end: {
    handles: HANDLE_PATTERNS.INPUT_ONLY,
    symbol: { type: 'icon', color: 'red', content: <Square size={16} /> }
  },
  add: {
    handles: HANDLE_PATTERNS.BINARY_OPERATION,
    symbol: { type: 'text', color: 'blue', size: 'xl', content: '+' }
  },
  subtract: {
    handles: HANDLE_PATTERNS.BINARY_OPERATION,
    symbol: { type: 'text', color: 'orange', size: 'xl', content: '-' }
  },
  multiply: {
    handles: HANDLE_PATTERNS.BINARY_OPERATION,
    symbol: { type: 'text', color: 'purple', size: 'xl', content: '×' }
  },
  divide: {
    handles: HANDLE_PATTERNS.BINARY_OPERATION,
    symbol: { type: 'text', color: 'pink', size: 'xl', content: '÷' }
  },
  power: {
    handles: HANDLE_PATTERNS.BINARY_OPERATION,
    symbol: {
      type: 'custom',
      content: (
        <div className="node-symbol-base node-symbol-green node-symbol-sm">
          <span>p</span><sup className="node-symbol-superscript">2</sup>
        </div>
      )
    }
  },
  sqrt: {
    handles: HANDLE_PATTERNS.INPUT_OUTPUT,
    symbol: { type: 'text', color: 'green', size: 'xl', content: '√' }
  },
  equal: {
    handles: HANDLE_PATTERNS.BINARY_OPERATION_ALT,
    symbol: { type: 'text', color: 'teal', size: 'xl', content: '=' }
  },
  assignment: {
    handles: HANDLE_PATTERNS.BINARY_OPERATION_ALT,
    symbol: { type: 'text', color: 'slate', size: 'xl', content: '↰' }
  },
  derivative: {
    handles: HANDLE_PATTERNS.INPUT_ONLY,
    symbol: {
      type: 'text',
      color: 'green',
      size: 'xs',
      flexCol: true,
      content: (
        <>
          <div>dy</div>
          <div className="node-symbol-divider">dx</div>
        </>
      )
    }
  },
  integral: {
    handles: HANDLE_PATTERNS.INPUT_ONLY,
    symbol: { type: 'text', color: 'blue', size: 'xl', content: '∫' }
  },
  substitute: {
    handles: HANDLE_PATTERNS.BINARY_OPERATION,
    symbol: { type: 'text', color: 'slate', size: 'xs', content: 'Sub' }
  },
  calculate: {
    handles: HANDLE_PATTERNS.INPUT_CUSTOM('input'),
    symbol: { type: 'text', color: 'indigo', size: 'xs', content: 'Cal' }
  }
}

