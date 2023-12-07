import React from 'react';
import locations from "./Location";
import Hand from "./Hand";

let GameScene = ({username, socket, hands}) => {

    let determineHands = () => {
        let mappedHands = []

        const playerIterator = Object.keys(hands).filter(v => v !== username)
        const locationIterator = Object.keys(locations).filter(v => locations[v] !== locations.Bottom)

        console.log(playerIterator)

        while (playerIterator.length !== 0) {
            let hand = playerIterator.shift()
            console.log(locationIterator)
            mappedHands.push(<Hand key={hand} player={hand} hand={hands[hand]} location={locations[locationIterator.shift()]} hideCards={true}/>)
        }

        mappedHands.push(<Hand key={username} player={username} hand={hands[username]} location={locations.Bottom} hideCards={false}/>)

        return mappedHands
    }

    return (
        <>
            {determineHands()}
        </>
    )
};

export default GameScene;
