import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import ChatMessages from './ChatMessages'
import ChatInput from "./ChatInput";
import SendPhotoButton from "./SendPhotoButton";
import UserList from "./UserList";

const ChatRoom = ({token}) => {



    return (
        <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                <Paper elevation={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}/>
                        <Grid xs={9} item container spacing={2} direction="column">
                            <Grid item>
                                <Paper elevation={2}>
                                    <ChatMessages/>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <SendPhotoButton/>
                            </Grid>
                            <Grid item>
                                <ChatInput token={token}/>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper elevation={2}>
                                <UserList/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>


        )
}

export default ChatRoom;