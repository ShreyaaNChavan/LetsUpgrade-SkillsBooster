import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import axios from '../../api/axiosInstance';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const newMessages = [...messages, { sender: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput('');

        try {
            const response = await axios.post('/api/chatbot/chat', { message: userInput });
            setMessages([...newMessages, { sender: 'bot', text: response.data.response }]);
        } catch (error) {
            setMessages([...newMessages, { sender: 'bot', text: 'Error: Unable to fetch response.' }]);
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">Chatbot</div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} sender={msg.sender} text={msg.text} />
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;
