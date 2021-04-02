import React from 'react';
import { Grid, Paper, Box } from '@material-ui/core';
import ChatMessages from './ChatMessages'
import ChatInput from "./ChatInput";
import SendPhotoButton from "./SendPhotoButton";
import UserList from "./UserList";
import COLORS from "../colors";

const ChatRoom = ({token}) => {

    return (<Box pt={4}>
        <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                <Paper elevation={5} style={{backgroundColor: COLORS.primaryBackground}}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}/>
                        <Grid xs={9} item container spacing={2} direction="column">
                            <Grid item>
                                <Paper elevation={5}>
                                    <ChatMessages/>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <SendPhotoButton token={token}/>
                            </Grid>
                            <Grid item>
                                <ChatInput token={token}/>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper elevation={5}>
                                <UserList/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </Box>)
}

export default ChatRoom;