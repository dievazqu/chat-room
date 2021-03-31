import React from "react";
import { Paper } from '@material-ui/core';

const Message = ({message}) => {
    console.log("Message", message);

    return (<div>
        <div style={{fontWeight: 'bold'}}>
            {message.user.name}:
        </div>
        <div>   {message.message}    </div>
    </div>);
}


export default Message;