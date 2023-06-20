const express = require('express');
const path = require("path");
const util = require("util");

const fs = require("fs");
const { error } = require('console');

const PORT = 3001;
const app = express();



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
