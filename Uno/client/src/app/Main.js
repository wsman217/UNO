import React, {useState} from 'react';
import Socket from "../communication/socket";
import LoginPage from "./LoginPage";
import Hider from "./Hider";
import SelectionMenu from "./SelectionMenu";
import WaitingRoom from "./WaitingRoom";
import GameScene from "./GameScene";
import {mapCard} from '../image_load';

let Main = () => {
    const [username, setUsername] = useState("")
    const [isInGame, setIsInGame] = useState(false)
    const [hasGameStarted, setHasGameStarted] = useState(false)
    const [players, setPlayers] = useState([])
    const [isOwner, setIsOwner] = useState(false)
    const [hands, setHands] = useState({})

    let getHands = () => {
        return hands
    }

    let socket = new Socket(process.env.REACT_APP_SERVER_URL, setHasGameStarted, setPlayers, setHands, getHands)

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

            <Hider hidden={!hasGameStarted}
                   prop={
                        <GameScene
                            username={username}
                            socket={socket}
                            hands={hands}
                        />
                   }
            >
            <img src={mapCard.get('Y4')}/>
            </Hider>
            <img src={mapCard.get('W')}/>
        </div>
    )
}

export default Main;
