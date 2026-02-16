# Excel App

A full-stack web application for managing and displaying Excel data with an interactive frontend and Python backend.

## Overview

This project provides a modern web interface to work with Excel files. It features a clean, responsive UI built with HTML, CSS, and JavaScript, backed by a Python FastAPI server for data processing and management.

## Features

- 📊 Upload and manage Excel files
- 🎨 Clean and responsive user interface
- ⚡ Fast and efficient backend with FastAPI
- 📱 Cross-platform compatibility
- 🔄 Real-time data processing

## Project Structure

```
excel-app/
├── backend/
│   ├── app.py              # Python FastAPI application
│   └── venv/               # Virtual environment (not tracked)
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styling
│   ├── script.js           # Frontend logic
└── .gitignore              # Git ignore rules
```

## Prerequisites

- **Python 3.8+** (for backend)
- **Node.js 12+** (optional, if using build tools)
- **Modern web browser** (for frontend)

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - **Windows:**
   ```bash
   venv\Scripts\activate
   ```
   - **Mac/Linux:**
   ```bash
   source venv/bin/activate
   ```

4. Install dependencies:
```bash
pip install os json flask flask-cors python-dotenv google-genai
```


## Running the Project

### Start the Backend

1. From the backend directory (with virtual environment activated):
```bash
python app.py
```

Or using uvicorn directly:
```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`

### Start the Frontend

1. Open the frontend in your browser:
```bash
cd frontend
```

2. Open `index.html` in a modern web browser, or use a local server:

Run the html file in live server

```bash
# Using Python's built-in server
python -m http.server 3000

# Or using Node.js http-server
npx http-server -p 3000
```

Frontend will be available at `http://localhost:3000`



**Happy coding! 🚀**
