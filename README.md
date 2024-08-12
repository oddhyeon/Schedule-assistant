
# Activity Tracker Project

This project is an activity tracker that monitors and records active windows on Windows OS and active apps on Android devices. It uses WebSocket for real-time updates and integrates with a backend server to store and analyze activity data. The AI server uses Hugging Face models for task prioritization.

## Project Structure

```
.
├── WindowsApp
│   ├── main.js
│   ├── package.json
│   ├── preload.js
│   └── src
│       ├── App.vue
│       ├── components
│       │   └── TaskList.vue
│       └── main.js
├── AndroidApp
│   ├── app
│   │   ├── src
│   │   │   ├── main
│   │   │   │   ├── java
│   │   │   │   │   └── com
│   │   │   │   │       └── example
│   │   │   │   │           ├── activitytracker
│   │   │   │   │           │   ├── MainActivity.kt
│   │   │   │   │           │   ├── TaskViewModel.kt
│   │   │   │   │           │   └── WebSocketListener.kt
│   │   │   │   ├── res
│   │   │   │   │   └── layout
│   │   │   │   │       └── activity_main.xml
│   │   │   │   ├── AndroidManifest.xml
├── Backend
│   └── app.js
└── AI
    ├── model.py
    └── fastapi_app.py
```

## Features

- **WindowsApp**: Monitors and records active windows, sends data to the backend server.
- **AndroidApp**: Monitors and records active apps, sends data to the backend server.
- **Backend**: Express.js server that stores activity data and provides APIs for task prioritization.
- **AI**: FastAPI server using Hugging Face models for task prioritization.

## Setup Instructions

### WindowsApp

1. Navigate to the WindowsApp directory:
   ```sh
   cd WindowsApp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Electron application:
   ```sh
   npm start
   ```

### AndroidApp

1. Open the AndroidApp directory in Android Studio.
2. Build and run the application on an Android device or emulator.

### Backend

1. Navigate to the Backend directory:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   node app.js
   ```

### AI

1. Navigate to the AI directory:
   ```sh
   cd AI
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Start the FastAPI server:
   ```sh
   uvicorn fastapi_app:app --reload
   ```

## GitHub Actions CI/CD

This project uses GitHub Actions for continuous integration and continuous deployment. The workflow file is located at `.github/workflows/ci.yml`.

### GitHub Actions Workflow

```yaml
name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    services:
      mongodb:
        image: mongo:latest
        ports:
          - 27017:27017

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    # Backend Setup and Test
    - name: Set up Node.js
      uses: actions/setup-node@v1
      with:
        node-version: '14'
    - name: Install Backend dependencies
      run: |
        cd Backend
        npm install
    - name: Run Backend tests
      run: |
        cd Backend
        npm test

    # AI Server Setup and Test
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.8'
    - name: Install AI dependencies
      run: |
        cd AI
        pip install -r requirements.txt
    - name: Run AI tests
      run: |
        cd AI
        pytest

    # WindowsApp Setup and Test
    - name: Install WindowsApp dependencies
      run: |
        cd WindowsApp
        npm install
    - name: Run WindowsApp tests
      run: |
        cd WindowsApp
        npm test

    # AndroidApp Setup and Test
    - name: Set up JDK
      uses: actions/setup-java@v1
      with:
        java-version: '11'
    - name: Install Android dependencies
      run: |
        cd AndroidApp
        ./gradlew build
    - name: Run Android tests
      run: |
        cd AndroidApp
        ./gradlew test

    # Integration Tests
    - name: Run Integration tests
      run: |
        # Commands to run integration tests
        echo "Running integration tests"
```

## Contact

For any inquiries, please contact [roughideal@gmail.com](mailto:your-email@example.com).
