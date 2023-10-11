import { useState, useEffect } from 'react';
import * as socket from '../../socket';
import styles from './Chat.module.css';

const colors = {
    userMessage: '#46d4d4',
    otherMessage: '#d885e3',
};

export default function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on('chat-message', (message) => {
            setMessages([...messages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [messages]);

    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('chat-message', { content: message });
            setMessage('');
        }
    };

    return (
        <div className={styles.chatWindow}>
            <div className={styles.messages}>
                {messages.map((msg, index) => (
                    <div key={index}>{msg.content}</div>
                ))}
            </div>
            <div className={styles.messageInput}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
