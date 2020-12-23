const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", require("./routes/UserRoute"));

module.exports = app;