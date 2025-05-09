# Task Management Application

A modern, intuitive task management application built with Vue 3 and Vite. This application helps you organize your weekly tasks with a clean, drag-and-drop interface.

🔗 **[Live Demo](https://selftask-manager.netlify.app/)**

## Features

- 📅 Weekly task organization (Monday to Friday)
- 🎯 Priority levels (Low, Medium, High)
- 📊 Task status tracking (Pending, In Progress, Blocked, Completed)
- 💾 Persistent storage using IndexedDB
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design

## Technologies Used

- Vue 3 - Progressive JavaScript Framework
- Vite - Next Generation Frontend Tooling
- Tailwind CSS - Utility-first CSS framework
- IndexedDB - Browser-based database

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd task-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Usage

1. Click "Create New Task" to add a new task
2. Fill in the task details:
   - Title (required)
   - Description (optional)
   - Select a day (Monday to Friday)
   - Choose priority level (Low, Medium, High)
3. Tasks can be:
   - Dragged between days
   - Updated with different status (click on status dots)
   - Deleted (click on 'x' button)
4. Task status is color-coded:
   - Yellow: Pending
   - Blue: In Progress
   - Red: Blocked
   - Green: Completed

## Project Structure

```
task-app/
├── src/
│   ├── components/
│   │   ├── TaskCard.vue    # Individual task component
│   │   ├── TaskColumn.vue  # Day column component
│   │   └── TaskForm.vue    # Task creation form
│   ├── utils/
│   │   └── db.js          # IndexedDB operations
│   ├── App.vue            # Main application component
│   └── main.js           # Application entry point
├── index.html
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
