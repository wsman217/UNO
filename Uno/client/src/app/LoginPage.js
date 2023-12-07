import React, {useState} from "react";
import ErrorDisplay from "./ErrorDisplay";

let LoginPage = ({socket, setUsername}) => {

    const [userNameTaken, setUserNameTaken] = useState(false)

    let loginHandler = (formData) => {
        let name = formData.target[0].value
        formData.preventDefault()
        socket.setUsername(name).then(result => {
            if (result) {
                setUsername(name)
            } else {
                setUserNameTaken(true)
            }
        })
    }

    return (
        <>
            <ErrorDisplay hidden={!userNameTaken} errorMessage="This username is taken."/>
            <form onSubmit={loginHandler}>
                <input type="text" name="username" placeholder="Username"/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default LoginPage