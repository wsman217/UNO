const {io} = require("socket.io-client");

class Socket {
    constructor(server_url) {
        this.socket = io(server_url);
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
}

export default Socket