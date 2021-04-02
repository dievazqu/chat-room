import React from "react";

const TextMessage = ({message}) => {
    return (<div>
        <div style={{fontWeight: 'bold'}}>
            {message.user.name}:
        </div>
        <div>{message.message}</div>
    </div>)
}

export default TextMessage;