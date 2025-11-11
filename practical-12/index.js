const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, 'db.json');

app.get('/api/notes', (req, res) => {
    res.json({
      message: "Za Warudo"
    });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

