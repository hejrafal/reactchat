import React, {useState} from 'react';
import {Grid, TextField, IconButton} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {connect} from "react-redux";
import * as actions from "../../store/actions";

const MessageCreator = ({selectedConversation, onAddMessage}) => {

    const [message, setMessage] = useState('');

    const messageChanged = (e) => {
        setMessage(e.target.value);
    }

    const onKeyPress = event => {
        event.key === 'Enter' ? createMessage() : null;
    }

    const handleAddMessage = (message) => {
        const url = `new-message/${selectedConversation.id}`;
        const newMessage = {message: message}

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(newMessage),
        })
            .then(response => response.json())
            .then(data => onAddMessage(data))
        ;
    };

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


const mapStateToProps = state => {
    return {
        selectedConversation: state.main.selectedConversation
    };
};

const mapDispatchToProps = dispatch => {
    return {onAddMessage: message => dispatch({type: actions.MESSAGE_ADD, message: message}),}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageCreator);
