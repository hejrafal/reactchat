import React, {useEffect, useRef} from 'react';
import Message from "./Message";

const MessageList = ({messages}) => {
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    }

    useEffect(scrollToBottom, [messages]);

    return <div>
        {messages.map(item =>
            (<Message
                key={item.id}
                userMessage={item.participant.user}
                date={item.createdAt}
                message={item.content}/>)
        )}
        <div ref={messagesEndRef}/>
    </div>
}


export default MessageList;
