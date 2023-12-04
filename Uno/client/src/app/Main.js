import React from 'react';
import Socket from "../communication/socket";
import LoginPage from "./LoginPage";

let Main = () => {
    let socket = new Socket(process.env.REACT_APP_SERVER_URL)

    return (
        <div>
            <LoginPage socket={socket}/>
        </div>
    )
}

export default Main;