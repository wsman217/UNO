import React from 'react';
import PlayableCard from "./PlayableCard";

let DrawPile = ({socket, player}) => {

    let drawCard = () => {
        // TODO error codes
        socket.drawCard(player)
    }

    return (
        <div className="draw_pile">
            <PlayableCard card={"BACK"} play={drawCard}/>
        </div>
    )
};

export default DrawPile;