import React, {useEffect, useState, useRef} from 'react';
import {Grid, Paper, AppBar, Toolbar, Typography} from "@material-ui/core";
import MessageCreator from "../MessageCreater/MessageCreator";
import LoginBox from "../LoginBox/LoginBox";
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import UserList from "../User/UserList";
import MessageList from "../Message/MessageList";
import RoomList from "../Room/RoomList";
import TopAppBar from "../AppBar/TopAppBar";

const style = {
    Paper: {padding: 20, margin: 10, height: 300, overflowY: 'auto'}
};

function Home({
                  messages, onAddMessage, user, users, onSelectUserOrRoom, selectedUserOrRoom,
                  setMessages, setSelectedConversation, rooms, ...props
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
    }, [user]);

    const findMessages = (selectedUserOrRoom, type) => {
        const uri = `messages/${type}/${selectedUserOrRoom.id}`;
        fetch(uri, {credentials: 'same-origin'})
            .then(response => response.json())
            .then(data => {
                setMessages(data.messages);
                setSelectedConversation(data.conversation);
            });
    }

    const selectUserOrRoom = (data, type) => {
        onSelectUserOrRoom({data: data, type: type});
        findMessages(data, type);
    }

    return (
        user === null ?
            <LoginBox /> :
            <Grid container>
                <TopAppBar user={user} />

                <Grid container>
                    <Grid item xs={4}>
                        <Paper style={style.Paper}>
                            <RoomList rooms={rooms} selected={selectedUserOrRoom}
                                      onSelectConversation={data => selectUserOrRoom(data, 'room')}/>
                            <hr/>
                            <UserList users={users} selected={selectedUserOrRoom}
                                      onSelectConversation={data => selectUserOrRoom(data, 'user')}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper style={style.Paper}>
                            <MessageList messages={messages} selectedConversation={selectedUserOrRoom}/>
                        </Paper>
                        <MessageCreator selectedConversation={selectedUserOrRoom}/>
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
        messagesRef: state.main.messagesRef,
        rooms: state.room.rooms
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddMessage: message => dispatch({type: actions.MESSAGE_ADD, message: message}),
        onSelectUserOrRoom: (userOrRoom) => dispatch({type: actions.SELECT_USER_OR_ROOM, userOrRoom: userOrRoom}),
        setMessages: messages => dispatch({type: actions.SET_MESSAGES, messages: messages}),
        setSelectedConversation: conversation => dispatch({
            type: actions.SELECT_CONVERSATION,
            conversation: conversation
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(Home)
