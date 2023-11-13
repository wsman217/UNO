http = require('http').createServer().listen(3000, "localhost");
const {Server} = require("socket.io");
const io = new Server(http);

io.on('connection', (socket) => {
    socket.on("yeet", () => {
        console.log("yeet");
        socket.emit("yote");
    })
})