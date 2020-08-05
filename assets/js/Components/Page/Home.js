import React, {useState} from 'react';
import {Grid, Paper, AppBar, Toolbar, IconButton, Typography, Button} from "@material-ui/core";
import GetNameDialog from "../Dialog/GetNameDialog";
import Message from "../Message/Message";
import MessageCreater from "../MessageCreater/MessageCreater";
import moment from "moment";
import MenuIcon from '@material-ui/icons/Menu';
import LoginBox from "../LoginBox/LoginBox";
import axios from 'axios';

const style = {
    Paper: {padding: 20, margin: 10, height: 500, overflowY: 'auto'}
};

export default function Home() {
    const [username, setUsername] = useState('');
    const [messages, setMessages] = useState([
        {id: 1, username: 'Rafał', date: '2020-08-01 20:21', message: 'Cześć'},
        {id: 2, username: 'Sylwia', date: '2020-08-01 20:23', message: 'Siemano'},
        {id: 3, username: 'Rafał', date: '2020-08-01 20:24', message: 'Co tam słychać?'},
    ]);
    const [users, setUsers] = useState([
        {id: 1, username: 'Rafał'},
        {id: 2, username: 'Sylwia'}
    ]);

    const onLoginInserted = (username) => {
        setUsername(username);
        axios.post('http://rchat.local/new-user', {username: username})
            .then(response => console.log(response));
    };

    const messagesList = (<div>
        {messages.map(item =>
            <Message
                key={item.id}
                username={item.username}
                date={item.date}
                message={item.message}/>)
        }
    </div>);
    const usersList = (
        <div>
            {users.map(user => <Typography key={user.id}>{user.username}</Typography>)}
        </div>
    );

    const handleAddMessage = (message) => {
        const newMessage = {
            id: Math.random(),
            username: username,
            date: moment().format('Y-m-d H:i'),
            message: message
        }
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
    };

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