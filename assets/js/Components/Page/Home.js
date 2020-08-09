import React, {useEffect, useState} from 'react';
import {Grid, Paper, AppBar, Toolbar, Typography} from "@material-ui/core";
import Message from "../Message/Message";
import MessageCreater from "../MessageCreater/MessageCreater";
import moment from "moment";
import LoginBox from "../LoginBox/LoginBox";
import axios from 'axios';

const style = {
    Paper: {padding: 20, margin: 10, height: 300, overflowY: 'auto'}
};

export default function Home() {
    const [username, setUsername] = useState('User ' + Math.floor(Math.random() * 100));
    const [newMessage, setNewMessage] = useState(null);
    const [messages, setMessages] = useState([
        //{id: 1, username: 'Rafał', date: '2020-08-01 20:21', message: 'Cześć'}
    ]);
    const [users, setUsers] = useState([
        {id: 1, username: 'Rafał'},
        {id: 2, username: 'Sylwia'}
    ]);

    useEffect(() => {
        const topic = encodeURIComponent('http://example.com/books/1');
        const eventSource = new EventSource("http://localhost:3000/.well-known/mercure?topic=" + topic);
        eventSource.onmessage = e => {
            const newMessage = JSON.parse(e.data);
            newMessage.id = Math.floor(Math.random() * 1000);
            setNewMessage(newMessage);
        };

    }, []);

    useEffect(() => {
        if (newMessage !== null) {
            const newMessages = [...messages, newMessage];
            setMessages(newMessages);
        }
    }, [newMessage]);

    const onLoginInserted = (username) => {
        setUsername(username);
        axios.post('http://rchat.local/new-user', {username: username});
    };

    const messagesList = (<div>
        {messages.map(item =>
            (<Message
                key={item.id}
                username={item.username}
                date={item.date}
                message={item.message}/>)
        )}
    </div>);
    const usersList = (<div>
        {users.map(user => <Typography key={user.id}>{user.username}</Typography>)}
    </div>);

    const handleAddMessage = (message) => {
        const newMessage = {
            id: Math.floor(Math.random() * 1000),
            username: username,
            date: moment().format('Y-m-d H:i'),
            message: message
        }

        axios.post('http://rchat.local/new-message', newMessage);
    };

    const handleServerMessage1 = (data) => {
        /*const newUser = {id: Math.random(), username: data.username};
        const newUsers = [...users, newUser];
        setUsers(newUsers);*/
    }

    return (
        username === '' ?
            <LoginBox onLoginInserted={onLoginInserted}/> :
            <Grid container>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            React Chat App :) hello, {username}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Grid container>
                    <Grid item xs={4}>
                        <Paper style={style.Paper}>
                            {usersList}
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper style={style.Paper}>
                            {messagesList}
                        </Paper>
                        <MessageCreater handleAddMessage={handleAddMessage}/>
                    </Grid>
                </Grid>
            </Grid>
    )

}