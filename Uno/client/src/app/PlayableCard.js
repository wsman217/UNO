import React from 'react';
import Card from "./Card";

let PlayableCard = ({card, play}) => {

    return (
        <button onClick={() => play(card)}>
            <Card card={card}/>
        </button>
    )
};

export default PlayableCard;