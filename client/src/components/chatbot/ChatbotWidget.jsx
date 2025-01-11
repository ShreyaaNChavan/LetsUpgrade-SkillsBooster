import React, { useState } from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import ChatWindow from './ChatWindow';
import './chatbot.css'; // Import custom styles for chatbot

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="chatbot-widget">
            {isOpen && <ChatWindow />}
            <button className="chatbot-button" onClick={toggleChat}>
                <FiMessageCircle size={24} />
            </button>
        </div>
    );
};

export default ChatbotWidget;
