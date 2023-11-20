http = require('http').createServer().listen(3000, "localhost");
const {Server} = require("socket.io");
const io = new Server(http);

const currentPlayers = new Map();

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