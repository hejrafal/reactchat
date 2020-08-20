import React from 'react';
import Message from "./Message";

const MessageList = (messages) => {

    return <div>
        {messages.map(item =>
            (<Message
                key={item.id}
                username={item.username}
                date={item.date}
                message={item.message}/>)
        )}
    </div>
}

export default MessageList;
