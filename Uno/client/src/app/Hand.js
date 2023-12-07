import React from 'react';

let Hand = ({player, hand, location, hideCards}) => {

    return (
        // TODO base the location of this on the location property.
        // TODO display the numbers or not based on hideCards
        // TODO hideCards will also determine if cards are a button.

        <div className={"hand_" + location}>
            {player}
            <br/>
            {hand}
        </div>
    )
};

export default Hand;