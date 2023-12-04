import React, {useState} from 'react';
import Socket from "../communication/socket";
import LoginPage from "./LoginPage";

let Main = () => {
    const [username, setUsername] = useState("")

    let socket = new Socket(process.env.REACT_APP_SERVER_URL)

    return (
        <div>
            {username}
            <LoginPage socket={socket} setUsername={setUsername}/>
        </div>
    )
}

export default Main;