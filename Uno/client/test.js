require('dotenv').config();
const {io} = require("socket.io-client");

const socket = io("http://localhost:3000");

console.log(process.env.SERVER_URL);

socket.emit('yeet');

socket.on("yote", () => {
    console.log("has been yoted");
})