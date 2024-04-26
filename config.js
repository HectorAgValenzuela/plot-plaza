
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV,
    HOST : process.env.HOST,
    PASS : process.env.PASS,
    DATABASE : process.env.DATABASE,
    USER : process.env.USER,
    PORT : process.env.PORT
}