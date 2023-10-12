import { useState, useEffect } from 'react';
import * as socket from '../../socket';

export default function Chat({ user }) {
    const [chat, setChat] = useState({
        name: 'Chatroom',
        messages: [],
        user: user,
    });
    const [messageInput, setMessageInput] = useState('');
    const [chatOpen, setChatOpen] = useState(false); // Initially set to false

    useEffect(function () {
        socket.registerSetChat(setChat);
    }, []);

    const sendMessage = () => {
        if (messageInput.trim() !== '') {
            socket.sendChatMessage(messageInput, chat, user);
            setMessageInput('');
        }
    };

    return (
        <div className="chatContainer">
            <button className="minimizeButton" onClick={() => setChatOpen(!chatOpen)}>
                {chatOpen ? "-" : "+"}
            </button>
            {chatOpen && (
                <div className="chatWindow">
                    <div className="messages">
                        {chat.messages.map((message, index) => (
                            <div key={index} className="message">
                                <span className='UserName'>{chat.user.name}:</span> {message}
                            </div>
                        ))}
                    </div>
                    <div className="messageInput">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    sendMessage();
                                }
                            }}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}
