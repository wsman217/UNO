import {useState} from "react";
import Hider from "./Hider";

let SelectionMenu = (setIsInGame) => {

    const [isHidden, setIsHidden] = useState(false)

    const hide = () => {
        setIsHidden(true)
    }

    return (
        <>
            <Hider
                hidden={isHidden}
                prop={
                    <>
                        <button>Join Game</button>
                        <button>Create Game</button>
                    </>
                }
            />
        </>
    )
}

export default SelectionMenu