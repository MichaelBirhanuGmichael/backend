# Task API

A simple REST API for managing tasks using Node.js and Express.

## Features
- Get all tasks: `GET /api/tasks`
- Add a new task: `POST /api/tasks`
- Mark as completed/update: `PUT /api/tasks/:id`
- Delete a task: `DELETE /api/tasks/:id`
- Filter tasks by completion: `GET /api/tasks?completed=true|false`
- Validation: Task title is required
- Simple HTML+CSS "API is running" page at `/`

## Getting Started

1. **Install dependencies:**
   ```powershell
   npm install
   ```
2. **Start the server:**
   ```powershell
   node server.js
   ```
3. **API Endpoints:**
   - `GET    /api/tasks`           — List all tasks
   - `POST   /api/tasks`           — Add a new task (JSON: `{ "title": "..." }`)
   - `PUT    /api/tasks/:id`       — Mark as completed or update (JSON: `{ "completed": true }`)
   - `DELETE /api/tasks/:id`       — Delete a task
   - `GET    /api/tasks?completed=true|false` — Filter by completion

4. **Visit** [http://localhost:3000](http://localhost:3000) to see the "API is running" page.

## Notes
- Data is stored in-memory (resets on server restart).

