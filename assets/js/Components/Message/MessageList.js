import React from 'react';
import Message from "./Message";

const MessageList = ({messages}) => {

    return <div>
        {messages.map(item =>
            (<Message
                key={item.id}
                username={`${item.participant.user.name} ${item.participant.user.surname}`}
                date={item.date}
                message={item.content}/>)
        )}
    </div>
}

export default MessageList;
