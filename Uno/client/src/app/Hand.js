import React from 'react';

let Hand = ({player, hand, location, hideCards}) => {
    // TODO base the location of this on the location property.

    // TODO display the numbers or not based on hideCards
    
    // TODO hideCards will also determine if cards are a button.

    return (
        <div className={"hand_" + location}>
            {hand}
            <br/>
            {player}
        </div>
    )
};

export default Hand;
