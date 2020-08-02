import React, {useState} from 'react';
import {Grid, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
            <TextField id="standard-basic" label="Standard" value={message} onChange={messageChanged} />
            <Button variant="outlined" color="primary" onClick={createMessage}>
                Add message
            </Button>
        </Grid>
    );
}