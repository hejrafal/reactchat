import React, {useState} from 'react';
import {Grid, TextField, InputBase, IconButton} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function ({handleAddMessage}) {

    const [message, setMessage] = useState('');

    const messageChanged = (e) => {
        setMessage(e.target.value);
    }

    const createMessage = () => {
        handleAddMessage(message)
        setMessage('');
    }

    return (
        <Grid container>
            <Grid item xs={11}>
                <TextField fullWidth id="standard-basic" label="Type message" value={message}
                           onChange={messageChanged}/>
            </Grid>
            <Grid item xs={1}>
                <IconButton color="primary" onClick={createMessage}>
                    <AddCircleIcon/>
                </IconButton>
            </Grid>
        </Grid>
    );
}