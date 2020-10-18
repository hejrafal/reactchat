import React, {useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Message from "./Message";
import { Typography, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px',
    },
}))

const MessageList = ({messages, selectedConversation}) => {
    const classes = useStyles()
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        if(selectedConversation) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }

    useEffect(scrollToBottom, [messages]);

    return (
        selectedConversation !== null ?
            <div>
                {messages.map(item =>
                    (<Message
                        key={item.id}
                        userMessage={item.participant.user}
                        date={item.createdAt}
                        message={item.content}/>)
                )}
                <div ref={messagesEndRef}/>
            </div> :
            <Box m="auto" className={classes.flex}>
                <Typography  align="center" variant="h5">Select User or Room to chat with others :)</Typography>
            </Box>
    );
}


export default MessageList;
