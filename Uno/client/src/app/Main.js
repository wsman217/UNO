import React, {useState} from 'react';
import Socket from "../communication/socket";
import LoginPage from "./LoginPage";
import Hider from "./Hider";
import SelectionMenu from "./SelectionMenu";
import WaitingRoom from "./WaitingRoom";

let Main = () => {
    const [username, setUsername] = useState("")
    const [isInGame, setIsInGame] = useState(false)
    const [hasGameStarted, setHasGameStarted] = useState(false)
    const [players, setPlayers] = useState([])
    const [isOwner, setIsOwner] = useState(false)

    let socket = new Socket(process.env.REACT_APP_SERVER_URL, setHasGameStarted, setPlayers)

    return (
        <div>
            <Hider hidden={username.length === 0}
                   prop={
                       <SelectionMenu
                           setIsInGame={setIsInGame}
                           socket={socket}
                           username={username}
                           setIsOwner={setIsOwner}/>
                   }
            />

            <Hider hidden={username.length !== 0}
                   prop={
                       <LoginPage
                           socket={socket}
                           setUsername={setUsername}
                       />
                   }
            />

            <Hider hidden={!isInGame || hasGameStarted}
                   prop={
                       <WaitingRoom
                           username={username}
                           players={players}
                           isOwner={isOwner}
                           socket={socket}
                       />
                   }
            />
        </div>
    )
}

export default Main;