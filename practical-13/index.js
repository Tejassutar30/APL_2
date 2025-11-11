const express = require('express');
const app = express();

let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const newTodo = req.body;
  newTodo.id = todos.length + 1;
  todos.push(newTodo);
  res.json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos[todoIndex] = req.body;
  res.json(todos[todoIndex]);
});

app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos.splice(todoIndex, 1);
  res.status(204).end();
});
