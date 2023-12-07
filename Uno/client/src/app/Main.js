import React, {useCallback, useState} from 'react';
import Socket from "../communication/socket";
import LoginPage from "./LoginPage";
import Hider from "./Hider";
import SelectionMenu from "./SelectionMenu";
import WaitingRoom from "./WaitingRoom";
import GameScene from "./GameScene";

let Main = () => {
    const [username, setUsername] = useState("")
    const [isInGame, setIsInGame] = useState(false)
    const [hasGameStarted, setHasGameStarted] = useState(false)
    const [players, setPlayers] = useState([])
    const [isOwner, setIsOwner] = useState(false)
    const [, updateState] = useState({})
    const forceUpdate = useCallback(() => updateState({}), [])
    const [hands, setHands] = useState({"player": ["Y3", "G2", "B1", "W"], "test": ["B6", "RD", "Y9"]})

    let updateHands = (player, hand) => {
        hands[player] = hand
        setHands(hands)
        forceUpdate()
    }

    let socket = new Socket(process.env.REACT_APP_SERVER_URL, setHasGameStarted, setPlayers, updateHands)

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
            />
        </div>
    )
}

export default Main;
