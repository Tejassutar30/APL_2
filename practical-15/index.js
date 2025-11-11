const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, 'db.json');

app.get('/api/notes', (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/notes', (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = notes.length + 1;
    notes.push(newNote);
    fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json(newNote);
    });
  });
});

app.put('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const notes = JSON.parse(data);
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    if (noteIndex === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }
    notes[noteIndex] = req.body;
    fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(notes[noteIndex]);
    });
  });
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const notes = JSON.parse(data);
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    if (noteIndex === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }
    notes.splice(noteIndex, 1);
    fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(204).end();
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

