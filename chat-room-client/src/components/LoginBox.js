import React, { useState } from 'react';
import { Button, Grid, Paper, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import COLORS from "../colors";

const LoginBox = ({onLogin}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            top: "15%"
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 500,
        }
    }));

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const login = (name) => {
        axios.post("/login", {name: name})
            .then(response => {
                console.log('Response received', response);
                const token = response.data && response.data.token;
                if (token) {
                    onLogin(token);
                } else{
                    console.log("Invalid token value" ,token);
                }

            })
            .catch(error => {
                console.log("Error while logging in",  error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging with name from LoginBox: " + inputValue);
        login(inputValue);
    }

    return (<Box pt={10}>
        <Grid container>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Paper elevation={5} style={{backgroundColor: COLORS.primaryBackground}}>
                    <form onSubmit={handleSubmit}>
                        <Grid item container spacing={2} alignItems="center" direction="column" >
                            <Grid item>
                                <h2>
                                    Welcome to My Chat App
                                </h2>
                            </Grid>

                            <Grid item>
                                <h4>
                                    What's your name?
                                </h4>
                            </Grid>

                            <Grid item>
                                <TextField label="Name" autoFocus={true} value={inputValue} onChange={handleChange}/>
                            </Grid>

                            <Grid item>
                                <Button variant="contained" style={{backgroundColor: COLORS.buttons}} type="submit">Enter Chat</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    </Box>);
}

export default LoginBox;
