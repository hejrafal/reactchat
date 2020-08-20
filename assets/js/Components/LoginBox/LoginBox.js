import React, {useState} from 'react';
import {Grid, Paper} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import axios from "axios";


const style = {
    Paper: {padding: 20, margin: 10, height: 500, overflowY: 'auto'}
};

export default function ({onUserLogged}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usernameChanged = (e) => {
        setUsername(e.target.value);
    }

    const passwordChanged = (e) => {
        setPassword(e.target.value);
    }

    const logIn = (username, password) => {
        const data = {
            username,
            password,
            '_csrf_token': 'ueQp3v_yUU4fntTLVLPmoxpVuGc4gaBmITyqR5W7xHY'
        };

        //axios.post('http://rchat.local/login', data).then(data => console.log(data));

        fetch('http://rchat.local/login', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.success) {
                    onUserLogged(data.user);
                }
            });
    }

    const onKeyPress = event => {
        if (event.key === 'Enter') {
            logIn(username, password);
        }
    }

    return (
        <Grid container>
            <Grid item>
                <Paper style={style.Paper}>
                    Wpisz swój login pod którym będziesz widoczny dla innych użytkowników
                    <TextField
                        autoFocus
                        margin="dense"
                        id="login"
                        label="Login"
                        type="text"
                        fullWidth
                        value={username}
                        onKeyDown={onKeyPress}
                        onChange={usernameChanged}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Password"
                        type="text"
                        fullWidth
                        value={password}
                        onKeyDown={onKeyPress}
                        onChange={passwordChanged}
                    />
                    <Button onClick={() => logIn(username, password)} color="primary">
                        Akceptuj
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );

}
