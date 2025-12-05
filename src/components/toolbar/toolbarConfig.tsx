import React from 'react'
import { Play, Square } from 'lucide-react'

export interface ToolbarButtonConfig {
  nodeType: string
  title: string
  handles: Array<{
    position: 'left-top' | 'left-bottom' | 'left-center' | 'right-center'
  }>
  symbol: {
    color: 'green' | 'red' | 'blue' | 'orange' | 'purple' | 'pink' | 'teal' | 'slate' | 'indigo'
    size?: 'xl' | 'sm' | 'xs'
    content: React.ReactNode
  }
}

export const TOOLBAR_BUTTONS: ToolbarButtonConfig[] = [
  {
    nodeType: 'start',
    title: 'Start Node',
    handles: [{ position: 'right-center' }],
    symbol: { color: 'green', content: <Play size={16} /> }
  },
  {
    nodeType: 'end',
    title: 'End Node',
    handles: [{ position: 'left-center' }],
    symbol: { color: 'red', content: <Square size={16} /> }
  },
  {
    nodeType: 'add',
    title: 'Add Node',
    handles: [{ position: 'left-top' }, { position: 'left-bottom' }, { position: 'right-center' }],
    symbol: { color: 'blue', size: 'xl', content: '+' }
  },
  {
    nodeType: 'subtract',
    title: 'Subtract Node',
    handles: [{ position: 'left-top' }, { position: 'left-bottom' }, { position: 'right-center' }],
    symbol: { color: 'orange', size: 'xl', content: '-' }
  },
  {
    nodeType: 'multiply',
    title: 'Multiply Node',
    handles: [{ position: 'left-top' }, { position: 'left-bottom' }, { position: 'right-center' }],
    symbol: { color: 'purple', size: 'xl', content: '×' }
  },
  {
    nodeType: 'divide',
    title: 'Divide Node',
    handles: [{ position: 'left-top' }, { position: 'left-bottom' }, { position: 'right-center' }],
    symbol: { color: 'pink', size: 'xl', content: '÷' }
  },
  {
    nodeType: 'power',
    title: 'Power Node',
    handles: [{ position: 'left-top' }, { position: 'left-bottom' }, { position: 'right-center' }],
    symbol: {
      color: 'green',
      size: 'sm',
      content: (
        <>
          <span>p</span><sup className="node-symbol-superscript">2</sup>
        </>
      )
    }
  },
  {
    nodeType: 'sqrt',
    title: 'Square Root Node',
    handles: [{ position: 'left-center' }, { position: 'right-center' }],
    symbol: { color: 'green', size: 'xl', content: '√' }
  },
  {
    nodeType: 'equal',
    title: 'Equal Node',
    handles: [{ position: 'left-top' }, { position: 'left-bottom' }, { position: 'right-center' }],
    symbol: { color: 'teal', size: 'xl', content: '=' }
  },
  {
    nodeType: 'assignment',
    title: 'Assignment Node',
    handles: [{ position: 'left-center' }, { position: 'right-center' }],
    symbol: { color: 'slate', size: 'xl', content: '↰' }
  },
  {
    nodeType: 'derivative',
    title: 'Derivative Node',
    handles: [{ position: 'left-center' }, { position: 'right-center' }],
    symbol: {
      color: 'green',
      size: 'xs',
      content: (
        <>
          <div>dy</div>
          <div className="node-symbol-divider">dx</div>
        </>
      )
    }
  },
  {
    nodeType: 'integral',
    title: 'Integral Node',
    handles: [{ position: 'left-center' }, { position: 'right-center' }],
    symbol: { color: 'blue', size: 'xl', content: '∫' }
  },
  {
    nodeType: 'substitute',
    title: 'Substitute Node',
    handles: [{ position: 'left-top' }, { position: 'left-bottom' }, { position: 'right-center' }],
    symbol: { color: 'slate', size: 'xs', content: 'Sub' }
  },
  {
    nodeType: 'calculate',
    title: 'Calculate Node',
    handles: [{ position: 'left-center' }, { position: 'right-center' }],
    symbol: { color: 'indigo', size: 'xs', content: 'Cal' }
  }
]

