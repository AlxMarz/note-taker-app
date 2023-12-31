const express = require('express');
const path = require("path");
const util = require("util");

const fs = require("fs");
const { error } = require('console');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const readFromFile = util.promisify(fs.readFile);



app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get('/api/notes', (req, response) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => response.json(JSON.parse(data)));
});

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend=(content, file) =>{
  fs.readFile(file, "utf-8", (err ,data)=>{
    if (err) {
      console.error(err)
    } else {
      const parsedData = JSON.parse(data)
      parsedData.push(content)
      writeToFile(file, parsedData)
    }
  })

};



app.post('/api/notes', (req, res) => {
  // Let the client know that their add note request was received
  console.info(`${req.method} request received add notes`);
  const {tittle, text} = req.body

  if (req.body) {
    const newNote = {
      tittle,
      text,
    }
    readAndAppend(newNote, './db/db.json');
    res.status(201).json(response)
  } else {
    res.error('Error adding note');
  }
});



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
