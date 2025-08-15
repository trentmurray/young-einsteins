# SpaceKidPro - Kids Space & Physics Course

A Vue.js + TypeScript application for teaching kids about space and physics through an interactive, progressive learning experience.

## Features

- **7 Progressive Stages**: From basic science concepts to advanced space exploration
- **35 Interactive Modules**: Each with learning content and quizzes
- **Progress Tracking**: Automatic saving to localStorage
- **Stage Locking**: Must complete previous stages to unlock new ones
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, kid-friendly interface with animations

## Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Pinia** for state management
- **Tailwind CSS** for styling
- **VueUse** for utility functions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd young-einsteins
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── icons/           # SVG icon components
│   ├── ui/              # Reusable UI components
│   ├── Header.vue       # Application header
│   ├── StageCard.vue    # Stage overview cards
│   ├── StageChip.vue    # Stage badges
│   ├── ModulePanel.vue  # Individual module view
│   └── Quiz.vue         # Quiz component
├── data/
│   └── course.ts        # Course content and structure
├── stores/
│   └── progress.ts      # Pinia store for progress management
├── types/
│   └── course.ts        # TypeScript type definitions
├── App.vue              # Main application component
├── main.ts              # Application entry point
└── style.css            # Global styles and Tailwind imports
```

## Course Structure

The course is organized into 7 stages:

1. **Stage 1**: Discovering the World Around Us (5 modules)
2. **Stage 2**: Our Planet in Space (5 modules)
3. **Stage 3**: Solar System Explorers (5 modules)
4. **Stage 4**: Physics in Action (5 modules)
5. **Stage 5**: Space Travel & Exploration (5 modules)
6. **Stage 6**: The Bigger Universe (5 modules)
7. **Stage 7**: Bringing It All Together (5 modules)

Each module contains:
- Learning content with hands-on activities
- A quiz to test understanding
- Progress tracking

## Key Components

### Reusable UI Components
- `Button.vue` - Configurable button with variants
- `Card.vue` - Card container with hover effects
- `Progress.vue` - Progress bar component
- Icon components for consistent styling

### State Management
The `useProgressStore` Pinia store handles:
- Loading/saving progress to localStorage
- Calculating completion percentages
- Stage locking logic
- Finding next incomplete module

### Animations
Custom CSS animations for smooth transitions:
- Fade in/out effects
- Slide animations
- Hover effects

## Development

### Adding New Content
To add new stages or modules, edit `src/data/course.ts` following the existing structure.

### Styling
The application uses Tailwind CSS with custom components defined in `src/style.css`.

### Type Safety
All components and data structures are fully typed with TypeScript for better development experience.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is licensed under the MIT License.
