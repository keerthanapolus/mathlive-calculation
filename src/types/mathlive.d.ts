declare namespace JSX {
  interface IntrinsicElements {
    'math-field': any;
  }
}

declare class MathfieldElement extends HTMLElement {
  value: string;
  executeCommand(command: string): void;
  addEventListener(type: string, listener: (event: Event) => void): void;
  focus(): void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        ref?: React.Ref<MathfieldElement>;
        value?: string;
        placeholder?: string;
        className?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

export {};
