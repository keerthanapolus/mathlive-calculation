/// <reference types="vite/client" />

/**
 * Vite Environment Types
 * This file provides TypeScript definitions for Vite's environment variables
 * No .env file configuration needed - Vite automatically sets these values
 */

interface ImportMetaEnv {
  readonly DEV: boolean
  readonly PROD: boolean
  readonly MODE: string
  // Add other environment variables here if needed
  // readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

