import React from 'react';
import {mapCard} from "../image_load";
import PlayableCard from "./PlayableCard";

let Hand = ({player, hand, location, hideCards, socket}) => {

    let play = (card) => {
        // TODO error codes
        console.log("Card played " + card)
        socket.playCard(player, card)
    }

    let displayCards = () => {
        let cards = []

        for (let index in hand) {
            if (hideCards) {
                cards.push(<PlayableCard key={index} card={mapCard.get("BACK")} play={play}/>)
                continue
            }

            let card = hand[index]
            cards.push(<PlayableCard key={index} card={mapCard.get(card)} play={play}/>)
        }

        return cards
    }

    return (
        <div className={"hand_" + location}>
            {player}
            {displayCards()}
        </div>
    )
};

export default Hand;