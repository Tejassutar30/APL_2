const fs = require('fs');
const path = require('path');

const dbFilePath = "./db.txt";

async function getNotes() {
  try {
    const data = await fs.promises.readFile(dbFilePath, 'utf8');
    return data.split('\n');
  } catch (err) {
    console.error(err);
    throw new Error('Internal server error');
  }
}

async function saveNotes(notes) {
  try {
    await fs.promises.writeFile(dbFilePath, notes.join('\n'));
  } catch (err) {
    console.error(err);
    throw new Error('Internal server error');
  }
}

async function createNote(note) {
  const notes = await getNotes();
  notes.push(note);
  await saveNotes(notes);
  return note;
}

async function run() {
  const note = `How i cracked the google interview notes
no i didnt (╥﹏╥)  ....`;
  await createNote(note);
  const notes = await getNotes();
  console.log(notes);
}

run();
