/**
 * Shadow DOM CSS styles for MathLive components
 * These styles are injected into Shadow DOM at runtime.
 * The corresponding CSS is also defined in index.css for reference.
 */

export const MATHLIVE_EDGELABEL_CSS = `
  :host {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    font-size: 10px !important;
    font-weight: 400 !important;
    color: #000000 !important;
    display: flex !important;
    flex-direction: column-reverse !important;
    min-width: auto !important;
    pointer-events: none !important;
  }
  .ML__container {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    display: flex !important;
    flex-direction: column-reverse !important;
  }
  .ML__base {
    font-size: 10px !important;
    font-weight: 400 !important;
    color: #000000 !important;
  }
`

export const MATHLIVE_CUSTOM_CSS = `
  .ML__container {
    height: 100% !important;
  }
  .ML__toggles {
    align-self: center !important;
  }
  .ML__virtual-keyboard-toggle [title],
  .ML__virtual-keyboard-toggle [data-tooltip],
  .ML__virtual-keyboard-toggle [role="tooltip"],
  .ML__menu-toggle [title],
  .ML__menu-toggle [data-tooltip],
  .ML__menu-toggle [role="tooltip"] {
    z-index: 99999 !important;
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: auto !important;
  }
`

