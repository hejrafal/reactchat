import React, {useState} from 'react';
import {Grid, Paper} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


const style = {
    Paper: {padding: 20, margin: 10, height: 500, overflowY: 'auto'}
};

export default function ({onLoginInserted}) {

    const [username, setUsername] = useState('')

    const usernameChanged = (e) => {
        setUsername(e.target.value);
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
                        onChange={usernameChanged}
                    />
                    <Button onClick={() => onLoginInserted(username)} color="primary">
                        Akceptuj
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );

}