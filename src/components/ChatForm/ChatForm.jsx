import { socket } from "../../socket"
import { useState } from 'react';

export default function ChatForm() {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        socket.timeout(5000).emit('create-something', value, () => {
            setIsLoading(false);
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <input onChange={event => setValue(event.target.value)} />

            <button type="submit" disabled={isLoading}>Submit</button>
        </form>
    );
};
