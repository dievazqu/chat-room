import React, { useState, useEffect, useRef } from 'react';
import socket from "./Socket";
import { Grid } from '@material-ui/core';
import Message from "./Message";
import COLORS from "../colors"

const ChatMessages = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("new_message", (new_message) => {
            console.log("New message", new_message);

            setMessages([...messages, new_message])
            console.log("Message added", messages);
        });

        socket.on("new_image", (new_image) => {
            console.log("New image", new_image);

            setMessages([...messages, new_image])
            console.log("Image message added", messages);
        });

        return () => { socket.off() }
    }, [messages]);

    const scrollRef = useRef(null);
    useEffect(() => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth'});
    });

    return (<div style={{backgroundColor: COLORS.chatBackground}}>
        <div style={{overflow: "scroll", minHeight: 460, maxHeight: 600, margin: 20}}>
            <Grid container direction={"column"} spacing={2}>
                <br/>
                { messages.length === 0 ? "" : messages.map((msg, i) => {
                        return (<Grid item key={i}> <Message message={msg}/> </Grid>)
                }) }
                <div ref={scrollRef}/>
            </Grid>
        </div>
    </div>);
}

export default ChatMessages;