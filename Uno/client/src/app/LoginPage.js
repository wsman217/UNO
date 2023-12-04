import React from "react";

let LoginPage = ({socket, username}) => {

    let loginHandler = (formData) => {
        formData.preventDefault()
        let result = socket.setUsername(formData.target[0].value)

        result.then(e => console.log(e))
    }

    return (
        <div>
            <form onSubmit={loginHandler}>
                <input type="text" name="username" placeholder="Username"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LoginPage