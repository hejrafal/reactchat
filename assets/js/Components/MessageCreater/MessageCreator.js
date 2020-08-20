import React, {useState} from 'react';
import {Grid, TextField, IconButton} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';

const MessageCreator = ({handleAddMessage}) => {

    const [message, setMessage] = useState('');

    const messageChanged = (e) => {
        setMessage(e.target.value);
    }

    const onKeyPress = event => {
        event.key === 'Enter' ? createMessage() : null;
    }

    const createMessage = () => {
        handleAddMessage(message)
        setMessage('');
    }

    return (
        <Grid container>
            <Grid item xs={11}>
                <TextField fullWidth id="standard-basic" label="Type message" value={message}
                           onChange={messageChanged} onKeyPress={onKeyPress}/>
            </Grid>
            <Grid item xs={1}>
                <IconButton color="primary" onClick={createMessage}>
                    <AddCircleIcon/>
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default MessageCreator;