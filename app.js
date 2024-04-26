const express = require("express");
const config = require('./config.js');

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

app.listen(5000, () => {
    console.log("Server started at port 5000");
});