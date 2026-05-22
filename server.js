const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];
let id = 1;

// GET - ia toate task-urile
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST - adaugă task
app.post('/tasks', (req, res) => {
  const newTask = { id: id++, text: req.body.text, done: false };
  tasks.push(newTask);
  res.json(newTask);
});

// PUT - marchează ca făcut
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  task.done = !task.done;
  res.json(task);
});

// DELETE - șterge task
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: 'Șters' });
});

app.listen(5000, () => console.log('Server pornit pe http://localhost:5000'));
