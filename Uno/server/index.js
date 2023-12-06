require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
const http = require('http').createServer().listen(process.env.SERVER_PORT, process.env.SERVER_URL)
const {Server} = require("socket.io")
const GameServer = require('./GameServer.js')
const io = new Server(http, {
    cors: {
        origin: "http://localhost:3000"
    }
})

const currentPlayers = []
const servers = new Map()

const playerToServer = new Map()

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
        playerToServer.set(username, gameServer)
        ackFunction(200)
    })

    socket.on("joinServer", (username, serverName, ackFunction) => {
        if (!servers.has(serverName)) {
            ackFunction(404)
        }

        let gameServer = servers.get(serverName)
        gameServer.addPlayer(username, socket)
        playerToServer.set(username, gameServer)
        ackFunction(200)
    })

    socket.on("startGame", username => {
        let gameServer = playerToServer.get(username)
        gameServer.startGame()
    })

    socket.on("playCard", (username, card, ackFunction) => {
        let gameServer = playerToServer.get(username)
        ackFunction(gameServer.playCard(username, card))
    })

    socket.on("drawCard", (username, ackFunction) => {
        let gameServer = playerToServer.get(username)
        ackFunction(gameServer.drawCard(username, 1))
    })
})
