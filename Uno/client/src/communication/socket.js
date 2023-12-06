const {io} = require("socket.io-client");

class Socket {
    constructor(server_url, setHasGameStarted, setPlayers) {
        this.socket = io(server_url);
        this.setHasGameStarted = setHasGameStarted
        this.setPlayers = setPlayers

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
        console.log("create server")
        console.log(this.socket.id)
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
                }
            })
        })
    }

    startGame(username) {
        this.socket.emit("startGame", username)
        this.setHasGameStarted(true)
    }

    setupSocketListener() {
        this.socket.on("gameStart", () => {
            this.setHasGameStarted(true)
        })

        this.socket.on("setPlayers", players => {
            this.setPlayers(players)
        })
    }
}

export default Socket