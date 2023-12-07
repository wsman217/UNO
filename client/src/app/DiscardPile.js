import React from 'react';
import Card from "./Card";
import {mapCard} from "../image_load";

let DiscardPile = ({discard}) => {
    return (<Card card={mapCard.get(discard)}/>)
};

export default DiscardPile;