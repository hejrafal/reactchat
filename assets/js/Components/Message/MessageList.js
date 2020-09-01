import React from 'react';
import Message from "./Message";

const MessageList = ({messages}) => {

    return <div>
        {messages.map(item =>
            (<Message
                key={item.id}
                userMessage={item.participant.user}
                date={item.createdAt}
                message={item.content}/>)
        )}
    </div>
}

export default MessageList;
