import React from "react";
import TextMessage from "./TextMessage";
import ImageMessage from "./ImageMessage";
import { Paper } from '@material-ui/core';

const Message = ({message}) => {
    console.log("Message", message);


    const getMessage = () => {
        switch (message.type) {
            case "text":
                return <TextMessage message={message}/>
            case "image":
                return <ImageMessage message={message}/>
        }
    }

    return (<div>
        {getMessage()}
    </div>);
}


export default Message;