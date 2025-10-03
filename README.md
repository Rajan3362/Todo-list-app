# Angular Todo List App

A modern, responsive Todo List application built with Angular, Angular Material, Firebase Firestore, and NgRx state management.

## 🚀 Features

- ✅ Add, edit, delete, and mark tasks as complete
- 🎨 Material Design UI with responsive layout
- 🔥 Real-time data sync with Firebase Firestore
- 📱 Progressive Web App (PWA) support
- 🏗️ State management with NgRx
- 🎯 Task prioritization (Low, Medium, High)
- 📅 Due date tracking
- 🏷️ Category organization
- 🔍 Filtering and sorting capabilities

## 🛠️ Tech Stack

- **Frontend**: Angular 19+, TypeScript
- **UI Framework**: Angular Material
- **State Management**: NgRx
- **Backend**: Firebase Firestore
- **Authentication**: Firebase Auth (ready for implementation)
- **Deployment**: Firebase Hosting (configured)

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Angular CLI (`npm install -g @angular/cli`)
- Firebase account

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd todo-list-app
2. Install Dependencies
bash
npm install
3. Firebase Setup
Create Firebase Project
Go to Firebase Console

Create a new project named "todo-list-app"

Enable Firestore Database

Get your Firebase configuration

Configure Environment
Create src/environments/environment.ts:

typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
  }
};
Create src/environments/environment.prod.ts with the same structure for production.

4. Run the Application
bash
ng serve
Navigate to http://localhost:4200/

🏗️ Project Structure
text
src/
├── app/
│   ├── components/
│   │   ├── task-form/          # Task creation/editing form
│   │   └── task-list/          # Task display and management
│   ├── models/                 # TypeScript interfaces
│   ├── services/               # Firebase service layer
│   ├── store/                  # NgRx state management
│   │   └── task/               # Task-specific state
│   ├── app.component.ts        # Root component
│   ├── app.config.ts           # Application configuration
│   └── app.routes.ts           # Routing configuration
├── assets/                     # Static assets
└── environments/               # Environment configurations
🔧 Configuration
Firebase Security Rules
Add to your Firestore rules:

javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{document} {
      allow read, write: if request.auth != null;
      // For development, you can use:
      // allow read, write: if true;
    }
  }
}
NgRx Store
The application uses NgRx for state management with:

Actions for all task operations

Effects for side effects

Reducers for state updates

Selectors for data queries


## **2. Create Environment Template Files**

Create `src/environments/environment.template.ts`:
```typescript
// Copy this file to environment.ts and environment.prod.ts
// Update with your Firebase configuration

export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
3. Create .gitignore File
Make sure your .gitignore includes:

# See http://help.github.com/ignore-files/ for more about ignoring files.

# compiled output
/dist
/tmp
/out-tsc
/browser

# dependencies
/node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# environment files (don't commit your actual keys)
/src/environments/environment.ts
/src/environments/environment.prod.ts

# misc
/.sass-cache
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings

# System Files
.DS_Store
Thumbs.db

# Firebase
.firebase/
*-debug.log
