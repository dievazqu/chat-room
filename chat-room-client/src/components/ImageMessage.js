import React from "react";

const ImageMessage = ({message}) => {
    console.log("IMAGE MESSAGE", message);

    return (<div>
        <div style={{fontWeight: 'bold'}}>
            {message.user.name}:
        </div>
        <img src={message.message} width={"200px"} height={"200px"}/>
    </div>)
}

export default ImageMessage;