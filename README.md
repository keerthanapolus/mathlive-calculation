# React Flow Examples

A comprehensive React application showcasing various React Flow features and examples, inspired by the official [React Flow examples](https://reactflow.dev/examples).

## Features

### 🎯 Basic Flow
- Simple nodes and edges with basic interactions
- Drag and drop functionality
- Zoom and pan controls
- Node selection and manipulation
- Export/import capabilities

### 🎨 Custom Nodes
- Multiple node shapes (rectangle, circle, diamond)
- Custom node components with icons
- Node resizing capabilities
- Node toolbars with action buttons
- Themed node styles

### 🖱️ Interactions
- Context menu (right-click)
- Node validation states
- Interactive node controls
- Cycle prevention in connections
- Advanced selection modes

### 📐 Layout Algorithms
- **Dagre**: Hierarchical layouts (top-bottom, bottom-top, left-right, right-left)
- **Force Layout**: Physics-based positioning
- **Tree Layout**: Simple tree structure
- **Random Layout**: Random positioning
- Auto-fit view after layout changes

### 🎨 Styling & Themes
- Dark/light mode toggle
- Gradient backgrounds and borders
- Custom color schemes
- Animated gradient edges
- Background pattern options (dots, cross, lines)
- Responsive design

### 🖊️ Whiteboard Features
- Drawing tools (pen, eraser, shapes)
- Freehand drawing capabilities
- Geometric shape creation
- Tool selection interface
- Canvas clearing functionality

### 🚀 Advanced Features
- **Subflows**: Nested workflow management
- **Collaborative Nodes**: Multi-user collaboration
- **Data Processing**: Progress tracking and status
- **Security Monitoring**: Threat detection and scanning
- Real-time status indicators
- Complex node interactions

## Tech Stack

- **React 18** with TypeScript
- **React Flow** (@xyflow/react) - Latest version
- **Tailwind CSS** - Styling and theming
- **Vite** - Build tool and dev server
- **Lucide React** - Icons
- **Dagre** - Layout algorithms
- **D3-Force** - Force-directed layouts

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-flow-examples
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── flows/           # Individual flow examples
│   │   ├── BasicFlow.tsx
│   │   ├── CustomNodesFlow.tsx
│   │   ├── InteractionsFlow.tsx
│   │   ├── LayoutsFlow.tsx
│   │   ├── StylingFlow.tsx
│   │   ├── WhiteboardFlow.tsx
│   │   └── AdvancedFlow.tsx
│   ├── Header.tsx       # Application header
│   ├── Sidebar.tsx      # Navigation sidebar
│   └── FlowExamples.tsx # Main flow router
├── types/
│   └── index.ts         # TypeScript type definitions
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and React Flow overrides
```

## Examples Overview

### 1. Basic Flow
Demonstrates fundamental React Flow concepts:
- Node creation and manipulation
- Edge connections
- Basic interactions
- Export/import functionality

### 2. Custom Nodes
Shows advanced node customization:
- Custom node shapes and styles
- Node resizing with NodeResizer
- Node toolbars with actions
- Multiple handle positions

### 3. Interactions
Advanced interaction patterns:
- Context menu implementation
- Node validation and states
- Interactive controls
- Connection validation

### 4. Layouts
Automatic layout algorithms:
- Dagre hierarchical layouts
- Force-directed positioning
- Tree structure layouts
- Layout comparison tools

### 5. Styling
Visual customization:
- Dark/light mode themes
- Gradient backgrounds
- Custom color schemes
- Background patterns

### 6. Whiteboard
Drawing and annotation features:
- Drawing tools selection
- Freehand drawing
- Shape creation
- Canvas management

### 7. Advanced
Complex enterprise features:
- Subflow management
- Collaborative editing
- Data processing workflows
- Security monitoring

## Key React Flow Features Demonstrated

- **Nodes & Edges**: Basic and custom node types
- **Handles**: Connection points and validation
- **Background**: Pattern and styling options
- **Controls**: Zoom, pan, and fit view
- **MiniMap**: Overview and navigation
- **NodeResizer**: Dynamic node sizing
- **NodeToolbar**: Contextual actions
- **Layout Algorithms**: Automatic positioning
- **Selection**: Multi-node selection
- **Validation**: Connection and node validation
- **Theming**: Dark/light mode support

## Customization

### Adding New Node Types
1. Create a new node component in the appropriate flow file
2. Add the node type to the `nodeTypes` object
3. Update the node creation logic

### Adding New Layouts
1. Implement the layout algorithm function
2. Add it to the layout options in `LayoutsFlow.tsx`
3. Update the layout application logic

### Styling Customization
- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for theme customization
- Use CSS classes for component-specific styling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React Flow](https://reactflow.dev) - The amazing node-based UI library
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Lucide](https://lucide.dev) - Beautiful icon library
- [Dagre](https://github.com/dagrejs/dagre) - Directed graph layout

## Resources

- [React Flow Documentation](https://reactflow.dev)
- [React Flow Examples](https://reactflow.dev/examples)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
