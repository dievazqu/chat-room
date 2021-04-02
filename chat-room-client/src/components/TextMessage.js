import React from "react";

const TextMessage = ({message}) => {
    console.log("TextMessage", message);

    return (<div style={{whiteSpace: "pre-wrap", width:"100%"}}>{message.message}</div>);
}

export default TextMessage;