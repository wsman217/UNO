const {io} = require("socket.io-client");

class Socket {
    constructor(server_url) {
        this.socket = io(server_url);
    }

    setUsername(username) {
        this.socket.emit("setUsername", username, () => {
            console.log("This is where we check if the username was accepted or not.")
        })
    }
}
