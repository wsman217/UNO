import React from 'react';
import PlayableCard from "./PlayableCard";
import Card from "./Card";
import {mapCard} from "../image_load";

let Hand = ({player, hand, location, hideCards, socket}) => {

    let play = (card) => {
        // TODO error codes
        console.log(card)
        if (card === "Z" || card === "W") {
            card = "R" + card

            console.log(card)
        }

        socket.playCard(player, card)
    }

    let displayCards = () => {
        let cards = []

        for (let index in hand) {
            if (hideCards) {
                cards.push(<Card key={index} card={mapCard.get("BACK")}/>)
                continue
            }

            let card = hand[index]
            cards.push(<PlayableCard key={index} card={card} play={() => play(card)}/>)
        }

        return cards
    }

    return (
        <div id={"holder_" + location}>
            <div id="name_card">
                {player}
            </div>
            <div id={"hand_" + location}>
                {displayCards()}
            </div>
        </div>
    )
};

export default Hand;
