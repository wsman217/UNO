import React from 'react';
import locations from "./Location";
import Hand from "./Hand";
import DrawPile from "./DrawPile";
import DiscardPile from "./DiscardPile";

let GameScene = ({username, socket, hands, discard}) => {

    let determineHands = () => {
        let mappedHands = []

        const playerIterator = Object.keys(hands).filter(v => v !== username)
        const locationIterator = Object.keys(locations).filter(v => locations[v] !== locations.Bottom)

        while (playerIterator.length !== 0) {
            let hand = playerIterator.shift()
            mappedHands.push(<Hand key={hand} player={hand} hand={hands[hand]} location={locations[locationIterator.shift()]} hideCards={true} socket={socket}/>)
        }

        mappedHands.push(<Hand key={username} player={username} hand={hands[username]} location={locations.Bottom} hideCards={false} socket={socket}/>)

        return mappedHands
    }

    return (
        <>
            <DrawPile socket={socket} player={username}/>
            <DiscardPile card={discard}/>
            {determineHands()}
        </>
    )
};

export default GameScene;
