import React, {useEffect, useState, useRef} from 'react';
import {Grid, Paper, AppBar, Toolbar, Typography} from "@material-ui/core";
import Message from "../Message/Message";
import MessageCreater from "../MessageCreater/MessageCreater";
import moment from "moment";
import LoginBox from "../LoginBox/LoginBox";
import axios from 'axios';
import {connect} from 'react-redux';

const style = {
    Paper: {padding: 20, margin: 10, height: 300, overflowY: 'auto'}
};

//{id: 1, username: 'Rafał', date: '2020-08-01 20:21', message: 'Cześć'}

function Home({messages, onAddMessage, ...props}) {
    const [username, setUsername] = useState(''); //'User ' + Math.floor(Math.random() * 100)
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const topic = encodeURIComponent('all'); //http://example.com/books/1
        const eventSource = new EventSource("http://localhost:3000/.well-known/mercure?topic=" + topic);
        eventSource.onmessage = e => {
            const newMessage = JSON.parse(e.data);
            newMessage.id = Math.floor(Math.random() * 1000);
            onAddMessage(newMessage);
        };
    }, []);

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
            date: moment().format('Y-m-d H:m:s'),
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

const mapStateToProps = state => {
    return {
        messages: state.messages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddMessage: (message) => dispatch({type: 'MESSAGE_ADD', message: message})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)