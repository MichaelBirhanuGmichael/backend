const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory task data store
let tasks = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Read a book', completed: true }
];
let nextTaskId = 3;

// Get all tasks, optionally filtered by completion status
app.get('/api/tasks', (req, res) => {
    const { completed } = req.query;
    let filteredTasks = tasks;
    if (completed === 'true') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (completed === 'false') {
        filteredTasks = tasks.filter(task => !task.completed);
    }
    res.json(filteredTasks);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    const newTask = {
        id: nextTaskId++,
        title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task by ID
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Update completion status if provided, default to true
    task.completed = req.body.completed !== undefined ? !!req.body.completed : true;

    // Update title if provided
    if (req.body.title !== undefined) {
        task.title = req.body.title;
    }

    res.json(task);
});

// Delete a task by ID
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// Serve the root page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});