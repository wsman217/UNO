require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
http = require('http').createServer().listen(process.env.SERVER_PORT, process.env.SERVER_URL);
const {Server} = require("socket.io");
const io = new Server(http);

const currentPlayers = [];
const servers = new Map();

/**
 * Response codes are loosely based on html
Response codes:
 200: ok
 418: name exists already
 404: not found
 */

io.on('connection', (socket) => {
    socket.on("setUsername", (username, ackFunction) => {
        if (currentPlayers.includes(username)) {
            ackFunction(418)
        }

        currentPlayers.push(username)
        ackFunction(200)
    })

    socket.on("createServer", (username, serverName, ackFunction) => {
        if (servers.has(serverName)) {
            ackFunction(418)
        }

        let gameServer = new GameServer(serverName, username)
        servers.set(serverName, gameServer)
        ackFunction(200)
    })

    socket.on("joinServer", (username, serverName, ackFunction) => {
        if (!servers.has(serverName)) {
            ackFunction(404)
        }

        let gameServer = servers.get(serverName)
        gameServer.addPlayer(username, socket);
        ackFunction(200)
    })
})

// TODO break this out into a separate file once we figure out how to do that lol
class GameServer {
    constructor(serverName, host) {
        this.serverName = serverName
        this.host = host
        this.players = new Map()
        // Array of tuples
        this.moves = []
    }

    addPlayer(username, socket) {
        this.players.set(username, socket)
    }
}