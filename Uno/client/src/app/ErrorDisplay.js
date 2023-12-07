let ErrorDisplay = ({hidden, errorMessage}) => {
    if (hidden) {
        return
    }
    return (<>
            {errorMessage}
        </>)
}

export default ErrorDisplay