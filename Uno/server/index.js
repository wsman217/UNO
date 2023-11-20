require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
http = require('http').createServer().listen(process.env.SERVER_PORT, process.env.SERVER_URL);
const {Server} = require("socket.io");
const io = new Server(http);

const currentPlayers = new Map();

console.log(process.env.SERVER_PORT)

io.on('connection', (socket) => {
    socket.on("setUsername", (username, ackFunction) => {
        console.log("username set");

        if (currentPlayers.has(username)) {
            ackFunction(418)
        }

        currentPlayers.set(username, socket)
        ackFunction(200)
    })
})