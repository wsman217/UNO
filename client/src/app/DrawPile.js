import React from 'react';
import PlayableCard from "./PlayableCard";

let DrawPile = ({socket, player}) => {

    let drawCard = () => {
        // TODO error codes
        socket.drawCard(player)
    }

    return (<PlayableCard card={"BACK"} play={drawCard}/>)
};

export default DrawPile;