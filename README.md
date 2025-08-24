# 📚 Course Builder Application

A **React.js application** that allows users to **create and manage online courses** by adding modules and resources.  
Built with **React, Vite, and CSS**, it provides an intuitive drag-and-drop interface and a clean UI.

---

## 🚀 Getting Started

### ✅ Prerequisites
- **Node.js** v18+ (recommended)
- **npm** v9+ (or yarn/pnpm)

---

### 📦 Installation

1. **Clone the repository** (or download the source code):
   ```bash
   git clone <repository-url>
   cd course-builder-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

### 🛠 Development

Run the development server:

```bash
npm run dev
```

👉 App will be available at **[http://localhost:5173](http://localhost:5173)**

---

### 🧹 Linting & Formatting

Check for linting errors:
```bash
npm run lint
```

Fix linting errors:
```bash
npm run lint:fix
```

Format code with Prettier:
```bash
npm run format
```

---

### 📦 Build for Production

```bash
npm run build
```

Output files will be generated in the **`dist/`** directory.

Preview the production build locally:
```bash
npm run preview
```

---

## 📂 Folder Structure

```
course-builder-app/
├── eslint.config.js      # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .prettierignore       # Prettier ignore rules
├── .vscode/              # VS Code settings
├── public/               # Public assets
├── src/                  # Source files
│   ├── assets/           # Images, icons, etc.
│   ├── components/       # React components
│   │   ├── modules/
│   │   │   ├── CourseBuilder.jsx   # Main course builder component
│   │   │   ├── ModuleCard.jsx      # Individual module card
│   │   │   ├── ModuleModal.jsx     # Create/edit module modal
│   │   │   ├── ModuleItem.jsx      # Items (links/files) inside modules
│   │   │   ├── LinkModal.jsx       # Modal for adding links
│   │   │   └── UploadModal.jsx     # Modal for uploading files
│   │   └── ui/
│   │       ├── Header.jsx          # Header with search & menu
│   │       └── EmptyState.jsx      # Empty state display
│   ├── App.jsx             # Root application component
│   ├── App.css             # Global styles
│   ├── main.jsx            # Entry point
│   └── index.css           # Base styles
└── index.html              # HTML template
```

---

## 🏗 Application Architecture

### Component Hierarchy
```
App
└── CourseBuilder
    ├── Header
    ├── EmptyState (shown when no modules exist)
    ├── ModuleCard (multiple instances)
    │   └── ModuleItem (multiple instances)
    ├── ModuleModal
    ├── LinkModal
    └── UploadModal
```

---

## 📝 Handoff Notes

When extending this application:
1. Follow existing **component structure and naming conventions**.
2. Maintain **consistent styling** with the existing UI / Figma design.
3. Use **React state & hooks** properly for new features.
4. Ensure **responsive behavior** on all screen sizes.
5. Add **comments** for complex logic.

---

## 📄 License
This project is licensed under the **MIT License**.

---

<div align="center">
  <p>Made with ❤️ using React & Vite</p>
  <p><strong>Happy Course Building! 🚀</strong></p>
</div>
