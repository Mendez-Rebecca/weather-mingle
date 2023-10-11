import { useState, useEffect } from 'react';
import * as socket from '../../socket';
import styles from './Chat.module.css';

export default function Chat() {
    const [chat, setChat] = useState({
        name: 'Chatroom',
        messages: []
    });
    const [messageInput, setMessageInput] = useState('');

    useEffect(function () {
        socket.registerSetChat(setChat);
    }, [])

    const sendMessage = () => {
        if (messageInput.trim() !== '') {
            socket.sendChatMessage(messageInput, chat);
            setMessageInput('');
        }
    };

    return (
        <div className={styles.chatWindow}>
            <div className={styles.messages}>

            </div>
            <div className={styles.messageInput}>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
