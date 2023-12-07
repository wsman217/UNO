import React from 'react';
import {mapCard} from "../image_load";
import Card from "./Card";

let Hand = ({player, hand, location, hideCards}) => {

    let displayCards = () => {
        let cards = []

        for (let index in hand) {
            if (hideCards) {
                cards.push(<Card key={index} card={mapCard.get("BACK")}/>)
                continue
            }

            let card = hand[index]
            cards.push(<Card key={index} card={mapCard.get(card)}/>)
        }

        return cards
    }

    return (
        // TODO base the location of this on the location property.
        // TODO display the numbers or not based on hideCards
        // TODO hideCards will also determine if cards are a button.

        <div className={"hand_" + location}>
            {player}
            {displayCards()}
        </div>
    )
};

export default Hand;