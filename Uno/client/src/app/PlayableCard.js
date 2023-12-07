import React from 'react';
import Card from "./Card";
import {mapCard} from "../image_load";

let PlayableCard = ({card, play}) => {

    return (
        <button onClick={play}>
            <Card card={mapCard.get(card)}/>
        </button>
    )
};

export default PlayableCard;