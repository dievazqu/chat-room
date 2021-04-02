import React from "react";
import TextMessage from "./TextMessage";
import ImageMessage from "./ImageMessage";
import { Box } from '@material-ui/core';
import COLORS from "../colors";

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
        <Box p={2} style={{borderRadius: "25px", backgroundColor: COLORS.chatBubble}}>
            <div style={{fontWeight: 'bold'}}>
                {message.user.name}
            </div>
            <br/>
            {getMessage()}
        </Box>
    </div>);
}


export default Message;