const http = require('http');
const app = require('./app');
const { PORT } = require("./config/config.js");

const server = http.createServer(app);

server.listen(PORT);