import React from 'react';
import Hider from "./Hider";

let WaitingRoom = ({username, players, isOwner, socket}) => {
    let startGame = () => {
        socket.startGame(username)
    }

    return (<>
            {players}
            <Hider hidden={!isOwner} prop={<button onClick={startGame}>Start</button>}/>
        </>)
};

export default WaitingRoom;