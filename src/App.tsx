import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import SimpleFlow from './components/SimpleFlow'

function App() {
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900">
      <ReactFlowProvider>
        <SimpleFlow />
      </ReactFlowProvider>
    </div>
  )
}

export default App