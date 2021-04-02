import React from "react";

const ImageMessage = ({message}) => {
    console.log("IMAGE MESSAGE", message);

    return (<img src={message.message} width={"400px"}/>);
}

export default ImageMessage;