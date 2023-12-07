import React from 'react';
import PlayableCard from "./PlayableCard";
import Card from "./Card";

let Hand = ({player, hand, location, hideCards, socket}) => {

    let play = (card) => {
        // TODO error codes
        socket.playCard(player, card)
    }

    let displayCards = () => {
        let cards = []

        for (let index in hand) {
            if (hideCards) {
                cards.push(<Card key={index} card={"BACK"}/>)
                continue
            }

            let card = hand[index]
            cards.push(<PlayableCard key={index} card={card} play={() => play(card)}/>)
        }

        return cards
    }

    return (<div className={"hand_" + location}>
            {player}
            {displayCards()}
        </div>)
};

export default Hand;
