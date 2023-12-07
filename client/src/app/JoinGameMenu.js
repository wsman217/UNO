import React, {useState} from 'react';
import Hider from "./Hider";
import ErrorDisplay from "./ErrorDisplay";

let JoinGameMenu = ({socket, setIsInGame, username}) => {
    const [gameNameExists, setGameNameExists] = useState(false)
    const [hasJoinedGame, setHasJoinedGame] = useState(false)
    const [isFull, setIsFull] = useState(false)

    let handleSubmit = (formData) => {
        let gameName = formData.target[0].value
        formData.preventDefault()
        socket.joinServer(username, gameName).then(result => {
            if (result === "Full") {
                setIsFull(true)
            } else if (result) {
                setHasJoinedGame(true)
                setIsInGame(true)
            } else {
                setGameNameExists(true)
            }
        })
    }

    return (<>
        <Hider
            hidden={hasJoinedGame}
            prop={<>
                <ErrorDisplay hidden={!isFull} errorMessage="This server is full."/>
                <ErrorDisplay hidden={!gameNameExists} errorMessage="This game name does not exist."/>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="serverID" placeholder="Game name"/>
                    <button type="submit">Join Game</button>
                </form>
            </>}
        />
    </>)
};

export default JoinGameMenu;