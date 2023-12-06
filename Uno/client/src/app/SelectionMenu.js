import {useState} from "react";
import Hider from "./Hider";
import CreateGameMenu from "./CreateGameMenu";
import JoinGameMenu from "./JoinGameMenu";

let SelectionMenu = ({socket, setIsInGame, username, setIsOwner}) => {

    const [isHidden, setIsHidden] = useState(false)
    const [isCreateGameHidden, setIsCreateGameHidden] = useState(true)
    const [isJoinGameHidden, setIsJoinGameHidden] = useState(true)

    const hide = () => {
        setIsHidden(true)
    }

    const unHideCreateGame = () => {
        hide()
        setIsCreateGameHidden(false)
    }

    const unHideJoinGame = () => {
        hide()
        setIsJoinGameHidden(false)
    }

    return (
        <>
            <Hider
                hidden={isHidden}
                prop={
                    <>
                        <button onClick={unHideJoinGame}>Join Game</button>
                        <button onClick={unHideCreateGame}>Create Game</button>
                    </>
                }
            />

            <Hider
                hidden={isCreateGameHidden}
                prop={<CreateGameMenu setIsInGame={setIsInGame} socket={socket} username={username} setIsOwner={setIsOwner}/>}
            />

            <Hider
                hidden={isJoinGameHidden}
                prop={<JoinGameMenu setIsInGame={setIsInGame} socket={socket} username={username}/>}
            />
        </>
    )
}

export default SelectionMenu