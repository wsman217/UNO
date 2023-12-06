import React, {useState} from 'react';
import ErrorDisplay from "./ErrorDisplay";
import Hider from "./Hider";

const CreateGameMenu = ({socket, setIsInGame, username, setIsOwner}) => {
    const [gameNameTaken, setGameNameTaken] = useState(false)
    const [hasJoinedGame, setHasJoinedGame] = useState(false)

    let handleSubmit = (formData) => {
        let gameName = formData.target[0].value
        formData.preventDefault()
        socket.createServer(username, gameName).then(result => {
            if (result) {
                setIsOwner(true)
                setHasJoinedGame(true)
                setIsInGame(true)
            } else {
                setGameNameTaken(true)
            }
        })
    }

    return (
        <>
            <Hider
                hidden={hasJoinedGame}
                prop={
                    <>
                        <ErrorDisplay hidden={!gameNameTaken} errorMessage="This game name is already taken."/>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="serverID" placeholder="Game name"/>
                            <button type="submit">Create game</button>
                        </form>
                    </>
                }
            />
        </>
    )
};

export default CreateGameMenu;