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
pip install -r requirements.txt
```

> **Note:** If `requirements.txt` doesn't exist, create one with your project dependencies (e.g., fastapi, uvicorn, openpyxl for Excel handling).

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
```bash
# Using Python's built-in server
python -m http.server 3000

# Or using Node.js http-server
npx http-server -p 3000
```

Frontend will be available at `http://localhost:3000`

## API Documentation

Once the backend is running, visit:
- **API Docs (Swagger):** `http://localhost:8000/docs`
- **Alternative Docs (ReDoc):** `http://localhost:8000/redoc`

## Usage

1. Start the backend server
2. Open the frontend in your browser
3. Use the interface to upload and manage Excel files
4. The frontend communicates with the backend APIs to process data

## Development

### Making Changes

1. Backend changes are auto-reloaded with the `--reload` flag
2. Frontend changes require a browser refresh
3. Check the browser console for frontend errors
4. Check terminal output for backend errors

## Troubleshooting

- **Port already in use:** Change the port number in the startup command
- **Module not found errors:** Ensure `requirements.txt` is installed
- **CORS errors:** Update backend CORS settings in `app.py`

## Contributing

Feel free to fork this repository and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please create an issue on the GitHub repository.

---

**Happy coding! 🚀**
