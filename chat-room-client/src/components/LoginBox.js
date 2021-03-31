import React, { useState } from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const LoginBox = ({onLogin}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
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

    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Paper elevation={4}>
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
                                <Button variant="contained" color="secondary" type="submit">Enter Chat</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>);
}

export default LoginBox;
