const {io} = require("socket.io-client");

class Socket {
    constructor(server_url, setHasGameStarted, setPlayers, setHands, setDiscard) {
        this.socket = io(server_url);
        this.setHasGameStarted = setHasGameStarted
        this.setPlayers = setPlayers
        this.setHands = setHands
        this.setDiscard = setDiscard

        this.setupSocketListener()
    }

    setUsername(username) {
        return new Promise((resolve) => {
            this.socket.emit("setUsername", username, (returnCode) => {
                if (returnCode === 418) {
                    resolve(false)
                } else if (returnCode === 200) {
                    resolve(true)
                }
            })
        })
    }

    createServer(username, serverName) {
        return new Promise((resolve) => {
            this.socket.emit("createServer", username, serverName, (returnCode) => {
                if (returnCode === 418) {
                    resolve(false)
                } else if (returnCode === 200) {
                    resolve(true)
                }
            })
        })
    }

    joinServer(username, serverName) {
        return new Promise((resolve) => {
            this.socket.emit("joinServer", username, serverName, (returnCode) => {
                if (returnCode === 404) {
                    resolve(false)
                } else if (returnCode === 200) {
                    resolve(true)
                } else if (returnCode === 403) {
                    resolve("full")
                }
            })
        })
    }

    playCard(username, card) {
        return new Promise((resolve) => {
            this.socket.emit("playCard", username, card, (returnCode) => {
                if (returnCode === 401) {
                    resolve("turn")
                } else if (returnCode === 404) {
                    resolve("card")
                } else if (returnCode === 400) {
                    resolve("invalid")
                } else if (returnCode === 200) {
                    resolve(true)
                }
            })
        })
    }

    drawCard(username) {
        return new Promise(resolve => {
            this.socket.emit("drawCard", username, returnCode => {
                if (returnCode === 401) {
                    resolve(false)
                } else if (returnCode === 200) {
                    resolve(true)
                }
            })
        })
    }

    startGame(username) {
        this.socket.emit("startGame", username)
    }

    setupSocketListener() {
        this.socket.on("gameStart", () => {
            this.setHasGameStarted(true)
        })

        this.socket.on("setPlayers", players => {
            this.setPlayers(players)
        })

        this.socket.on("updateCards", (player, hand) => {
            this.setHands(player, hand)
            console.log(hand)
        })

        this.socket.on("updateDiscard", card => {
            this.setDiscard(card)
        })
    }
}

export default Socket
