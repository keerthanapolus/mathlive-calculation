import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import SimpleFlow from './components/SimpleFlow'
import { ErrorBoundary } from './components/ErrorBoundary'

/**
 * Main App Component
 * Wraps the application with ErrorBoundary for error handling
 */
function App() {
  return (
    <ErrorBoundary>
      <div className="h-screen bg-gray-50 dark:bg-gray-900">
        <ReactFlowProvider>
          <SimpleFlow />
        </ReactFlowProvider>
      </div>
    </ErrorBoundary>
  )
}

export default App