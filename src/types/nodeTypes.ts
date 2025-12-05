import { Node } from '@xyflow/react'

/**
 * TypeScript interfaces for node components
 */

export interface NodeComponentProps {
  data: Node['data']
  selected: boolean
  id: string
}

