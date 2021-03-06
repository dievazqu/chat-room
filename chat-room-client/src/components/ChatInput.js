import React, {useState} from "react";
import { Button, Grid, TextField } from '@material-ui/core';
import socket from "./Socket";
import COLORS from "../colors";

const ChatInput = (token) => {

    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submiting message", message, token);
        if (message.length > 0) {
            socket.emit("send_message", {token: token.token, message: message})
            setMessage("");
        }
    }

    return (<form onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={9}>
                <TextField label="Message" fullWidth autoFocus={true} value={message} onChange={(e)=>setMessage(e.target.value)}/>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={2}>
                <Button variant="contained" style={{backgroundColor: COLORS.buttons}} type="submit">Send</Button>
            </Grid>

        </Grid>
    </form>)
}

export default ChatInput;