const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();

app.use(bodyParser.json(), cors());
let tasks = []; // In-memory storage for tasks

// GET endpoint to fetch all task items
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST endpoint to create a new tas item
app.post("/tasks", (req, res) => {
  const todo = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: req.body.completed || false,
  };
  console.log(req.body);
  tasks.push(todo);
  res.status(201).json(todo);
});

// PUT endpiont to update
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = tasks.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Task not found" });
  }
  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed || todo.completed;
  res.json(todo);
});

// DELETE endpoint to remove a task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks.splice(index, 1);
  res.status(204).send();
});

// runing the server on port 3000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
