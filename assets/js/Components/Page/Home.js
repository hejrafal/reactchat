import React, {useEffect, useState, useRef} from 'react';
import {Grid, Paper, AppBar, Toolbar, Typography} from "@material-ui/core";
import MessageCreator from "../MessageCreater/MessageCreator";
import LoginBox from "../LoginBox/LoginBox";
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import UserList from "../User/UserList";
import MessageList from "../Message/MessageList";
import RoomList from "../Room/RoomList";

const style = {
    Paper: {padding: 20, margin: 10, height: 300, overflowY: 'auto'}
};

function Home({
                  messages, onAddMessage, user, users, onUserLogged, setUserList, onSelectUserOrRoom, selectedUserOrRoom,
                  setMessages, setSelectedConversation, ...props
              }) {

    useEffect(() => {
        if (!user) {
            return;
        }

        const url = "http://localhost:3000/.well-known/mercure?topic=" + user.username;
        const eventSource = new EventSource(url);
        eventSource.onmessage = e => {
            const newMessage = JSON.parse(e.data);
            onAddMessage(newMessage);
        };

        fetch('http://rchat.local/users')
            .then(response => response.json())
            .then(data => setUserList(data));
    }, [user]);

    const findMessages = (selectedUserOrRoom, type) => {
        const uri = `http://rchat.local/messages/${type}/${selectedUserOrRoom.id}`;
        fetch(uri, {credentials: 'same-origin'})
            .then(response => response.json())
            .then(data => {
                setMessages(data.messages);
                setSelectedConversation(data.conversation);
            });
    }

    const rooms = [
        {id: 1, name: 'Prywatny 1'},
        {id: 2, name: 'Prywatny 2'},
        {id: 3, name: 'Prywatny 3'}
    ];

    const selectUserOrRoom = (data, type) => {
        onSelectUserOrRoom({data: data, type: type});
        findMessages(data, type);
    }

    return (
        user === null ?
            <LoginBox onUserLogged={onUserLogged}/> :
            <Grid container>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            React Chat App :) hello, {`${user.name} ${user.surname}`}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Grid container>
                    <Grid item xs={4}>
                        <Paper style={style.Paper}>
                            <RoomList rooms={rooms} selected={selectedUserOrRoom}
                                      onSelectConversation={data => selectUserOrRoom(data, 'user')}/>
                            <hr/>
                            <UserList users={users} selected={selectedUserOrRoom}
                                      onSelectConversation={data => selectUserOrRoom(data, 'room')}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper style={style.Paper}>
                            <MessageList messages={messages}/>
                        </Paper>
                        <MessageCreator/>
                    </Grid>
                </Grid>
            </Grid>
    )

}

const mapStateToProps = state => {
    return {
        messages: state.message.messages,
        user: state.main.user,
        users: state.user.users,
        selectedUserOrRoom: state.main.selectedUserOrRoom,
        messagesRef: state.main.messagesRef
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddMessage: message => dispatch({type: actions.MESSAGE_ADD, message: message}),
        onUserLogged: user => dispatch({type: actions.USER_LOGGED, user: user}),
        setUserList: users => dispatch({type: actions.USER_LIST, users: users}),
        onSelectUserOrRoom: (userOrRoom) => dispatch({type: actions.SELECT_USER_OR_ROOM, userOrRoom: userOrRoom}),
        setMessages: messages => dispatch({type: actions.SET_MESSAGES, messages: messages}),
        setSelectedConversation: conversation => dispatch({
            type: actions.SELECT_CONVERSATION,
            conversation: conversation
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(Home)
