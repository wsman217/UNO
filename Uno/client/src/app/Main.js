import React, {useState} from 'react';
import Socket from "../communication/socket";
import LoginPage from "./LoginPage";
import Hider from "./Hider";
import SelectionMenu from "./SelectionMenu";

let Main = () => {
    const [username, setUsername] = useState("")
    const [isInGame, setIsInGame] = useState(false)

    let socket = new Socket(process.env.REACT_APP_SERVER_URL)

    return (
        <div>
            <Hider hidden={username.length === 0} prop={<SelectionMenu setIsInGame={setIsInGame}/>}/>
            <Hider hidden={username.length !== 0} prop={<LoginPage socket={socket} setUsername={setUsername}/>}/>
            <Hider hidden={!isInGame} prop={"This is the game prop"}/>
        </div>
    )
}

export default Main;