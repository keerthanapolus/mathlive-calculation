import { Edge } from '@xyflow/react'

/**
 * Session storage utilities for canvas data
 */

const STORAGE_KEY = 'flowEdges'

import { handleError } from './errorHandler'

export const saveEdgesToSession = (edges: Edge[]): void => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(edges))
  } catch (error) {
    handleError(error, 'saveEdgesToSession')
  }
}

export const loadEdgesFromSession = (): Edge[] => {
  try {
    const savedEdges = sessionStorage.getItem(STORAGE_KEY)
    if (savedEdges) {
      return JSON.parse(savedEdges)
    }
  } catch (error) {
    handleError(error, 'loadEdgesFromSession')
  }
  return []
}

export const clearEdgesFromSession = (): void => {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    handleError(error, 'clearEdgesFromSession')
  }
}

