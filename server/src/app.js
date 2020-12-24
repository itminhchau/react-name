const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", require("./routes/UserRoute"));

app.use("/book", require("./routes/BookRouter"));

module.exports = app;