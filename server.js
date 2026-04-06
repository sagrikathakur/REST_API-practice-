import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

let myTasks = [
  { id: 1, title: "LEARN REST", completed: true },
  { id: 2, title: "BUILD TASK APP", completed: true },
  { id: 3, title: "TEST IN POSTMAN", completed: false },
  { id: 4, title: "DRINK WATER", completed: false }
];

// Routes prefix
const prefix = "/api/v1";

// GET ALL TASKS
app.get(`${prefix}/tasks`, (req, res) => {
  res.status(200).json({
    success: true,
    data: myTasks
  });
});

// CREATE (POST)
app.post(`${prefix}/tasks`, (req, res) => {
  if (!req.body || !req.body.title) {
    return res.status(400).json({
      success: false,
      message: "Title is required"
    });
  }

  const { title } = req.body;

  const newTask = {
    id: Date.now(),
    title,
    completed: false
  };

  myTasks.push(newTask);

  res.status(201).json({
    success: true,
    data: newTask
  });
});

// GET SINGLE TASK
app.get(`${prefix}/tasks/:id`, (req, res) => {
  const { id } = req.params;
  const task = myTasks.find(t => t.id === parseInt(id));

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${id} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: task
  });
});

// UPDATE TASK (PUT)
app.put(`${prefix}/tasks/:id`, (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const taskIndex = myTasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${id} not found`
    });
  }

  // Update existing fields if provided
  if (title !== undefined) myTasks[taskIndex].title = title;
  if (completed !== undefined) myTasks[taskIndex].completed = completed;

  res.status(200).json({
    success: true,
    data: myTasks[taskIndex]
  });
});

// DELETE TASK
app.delete(`${prefix}/tasks/:id`, (req, res) => {
  const { id } = req.params;
  const taskIndex = myTasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${id} not found`
    });
  }

  const deletedTask = myTasks.splice(taskIndex, 1);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: deletedTask[0]
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
});