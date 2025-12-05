/**
 * Centralized error handling utilities
 */

const isDevelopment = import.meta.env.DEV

/**
 * Logs errors in development mode, handles gracefully in production
 */
export const handleError = (error: unknown, context: string): void => {
  if (isDevelopment) {
    console.error(`[${context}] Error:`, error)
  }
  // In production, you might want to send to error tracking service
  // e.g., Sentry, LogRocket, etc.
}

/**
 * Logs warnings in development mode
 */
export const handleWarning = (message: string, context?: string): void => {
  if (isDevelopment) {
    const prefix = context ? `[${context}]` : ''
    console.warn(`${prefix} ${message}`)
  }
}

