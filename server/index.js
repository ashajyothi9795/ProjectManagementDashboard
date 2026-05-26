const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Learn React",
    completed: false,
  },
  {
    id: 2,
    title: "Build Dashboard",
    completed: true,
  },
];

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ADD task
app.post("/tasks", (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false,
  };

  tasks.push(newTask);

  res.json(newTask);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  tasks = tasks.filter((task) => task.id !== taskId);

  res.json({ message: "Task deleted" });
});

// TOGGLE COMPLETE
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  tasks = tasks.map((task) =>
    task.id === taskId
      ? { ...task, completed: !task.completed }
      : task
  );

  res.json({ message: "Task updated" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});