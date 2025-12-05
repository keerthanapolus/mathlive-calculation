/**
 * TypeScript interfaces for MathLive web components
 * Extends HTMLElement with MathLive-specific properties and methods
 */

export interface MathFieldElement extends HTMLElement {
  value: string
  readOnly: boolean
  smartMode: boolean
  smartFence: boolean
  smartSuperscript: boolean
  shadowRoot: ShadowRoot | null
  focus(): void
  executeCommand(command: string): void
  addEventListener(type: 'input', listener: (event: Event) => void): void
  removeEventListener(type: 'input', listener: (event: Event) => void): void
}

