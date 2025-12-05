import React from 'react'

interface ToolbarButtonProps {
  onClick: () => void
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

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ onClick, title, handles, symbol }) => {
  const getHandleClassName = (position: string) => {
    return `toolbar-handle-indicator handle-indicator-${position}`
  }

  return (
    <button 
      onClick={onClick} 
      className="toolbar-button" 
      title={title}
      aria-label={title}
    >
      <div className="toolbar-button-inner">
        <div className="toolbar-button-box">
          {handles.map((handle, index) => (
            <div key={index} className={getHandleClassName(handle.position)} />
          ))}
          <div className={`node-symbol-${symbol.color} ${symbol.size ? `node-symbol-${symbol.size}` : ''}`}>
            {symbol.content}
          </div>
        </div>
      </div>
    </button>
  )
}

