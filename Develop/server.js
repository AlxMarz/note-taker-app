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




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
