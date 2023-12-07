import React from 'react';
import PlayableCard from "./PlayableCard";
import {mapCard} from "../image_load";

let DrawPile = ({socket, player}) => {

    let drawCard = () => {
        // TODO error codes
        socket.drawCard(player)
    }

    return (
        <PlayableCard card={mapCard.get("BACK")} play={drawCard}/>
    )
};

export default DrawPile;