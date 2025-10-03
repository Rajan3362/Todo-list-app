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

git clone <your-repository-url>
cd todo-list-app

### 2. Install Dependencies

npm install

### 3. Firebase Setup

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

### 4. Run the Application

ng serve
Navigate to http://localhost:4200/

### 🏗️ Project Structure


src/
├── app/
│   ├── components/
│   │   ├── task-form/  
│   │   └── task-list/ 
│   ├── models/                
│   ├── services/              
│   ├── store/                 
│   │   └── task/              
│   ├── app.component.ts       
│   ├── app.config.ts         
│   └── app.routes.ts           
├── assets/                    
└── environments/             


### 🔧 Configuration
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


## Create Environment Template Files**

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

