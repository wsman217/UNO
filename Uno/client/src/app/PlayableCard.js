import React from 'react';
import Card from "./Card";
import {mapCard} from "../image_load";

let PlayableCard = ({card, play}) => {

    return (
        <button className="PlayableCard" onClick={() => play(card)}>
            <Card card={mapCard.get(card)}/>
        </button>
    )
};

export default PlayableCard;