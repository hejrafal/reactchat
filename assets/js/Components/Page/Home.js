import React, {useEffect, useState, useRef} from 'react';
import {Grid, Paper, AppBar, Toolbar, Typography} from "@material-ui/core";
import MessageCreator from "../MessageCreater/MessageCreator";
import moment from "moment";
import LoginBox from "../LoginBox/LoginBox";
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import UserList from "../User/UserList";
import MessageList from "../Message/MessageList";

const style = {
    Paper: {padding: 20, margin: 10, height: 300, overflowY: 'auto'}
};

//{id: 1, username: 'Rafał', date: '2020-08-01 20:21', message: 'Cześć'}

function Home({messages, onAddMessage, user, users, onUserLogged, setUserList, ...props}) {
    useEffect(() => {
        const topic = encodeURIComponent('all'); //http://example.com/books/1
        const eventSource = new EventSource("http://localhost:3000/.well-known/mercure?topic=" + topic);
        eventSource.onmessage = e => {
            const newMessage = JSON.parse(e.data);
            newMessage.id = Math.floor(Math.random() * 1000);
            onAddMessage(newMessage);
        };

        fetch('http://rchat.local/users')
            .then(response => response.json())
            .then(data => setUserList(data));
    }, []);

    const onLoginInserted = (username) => {
        axios.post('http://rchat.local/new-user', {username: username});
    };

    const handleAddMessage = (message) => {
        const newMessage = {
            id: Math.floor(Math.random() * 1000),
            username: user.username,
            date: moment().format('Y-m-d H:m:s'),
            message: message
        }

        axios.post('http://rchat.local/new-message', newMessage);
    };

    return (
        user === null ?
            <LoginBox onUserLogged={onUserLogged}/> :
            <Grid container>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            React Chat App :) hello, {user.username}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Grid container>
                    <Grid item xs={4}>
                        <Paper style={style.Paper}>
                            <UserList users={users}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper style={style.Paper}>
                            <MessageList messages={messages}/>
                        </Paper>
                        <MessageCreator handleAddMessage={handleAddMessage}/>
                    </Grid>
                </Grid>
            </Grid>
    )

}

const mapStateToProps = state => {
    return {
        messages: state.message.messages,
        user: state.main.user,
        users: state.user.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddMessage: message => dispatch({type: actions.MESSAGE_ADD, message: message}),
        onUserLogged: user => dispatch({type: actions.USER_LOGGED, user: user}),
        setUserList: users => dispatch({type: actions.USER_LIST, users: users}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
