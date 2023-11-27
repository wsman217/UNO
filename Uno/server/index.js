require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
http = require('http').createServer().listen(process.env.SERVER_PORT, process.env.SERVER_URL);
const {Server} = require("socket.io");
const io = new Server(http);

const currentPlayers = [];
const servers = new Map();

// TODO break this out into a separate file once we figure out how to do that lol
const baseNumbers = [...Array(9).keys()].map(key => key + 1)
const specials = ['S', 'R', 'D']
const wilds = ['W', 'Z']
const colors = ['R', 'G', 'B', 'Y']

class GameServer {

    constructor(serverName, host) {
        this.serverName = serverName
        this.host = host
        this.players = new Map()
        // Array of tuples
        this.moves = Array()
        this.drawPile = Array()
        this.hands = new Map()
        this.cards = Array()
        colors.map(color => {
            let collect = Array()
            let doubled = Array()
            doubled.push(...baseNumbers.map(numb => color.concat(numb.toString())))
            doubled.push(...specials.map(special => color.concat(special)))

            collect.push(...doubled)
            collect.push(...doubled)
            collect.push(color.concat('0'))

            collect.push(...wilds)
            return collect
        }).forEach(color => this.cards.push(...color))

        this.shuffleCards(this.cards)
    }

    addPlayer(username, socket) {
        this.players.set(username, socket)
        this.hands.set(username, Array())
    }

    shuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
    }

    dealToAll(cards, amount) {
        [...Array(amount).keys()].forEach(() => {
            [...this.players.keys()].forEach(player => {
                this.dealToOne(cards, player, 1)
            })
        })
    }

    dealToOne(cards, player, amount) {
        let currentHand = this.hands.get(player)
        currentHand.push(...[...Array(amount).keys()].map(() => cards.shift()))
        this.hands.set(player, currentHand)
    }
}

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
