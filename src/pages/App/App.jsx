import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import LoginPage from '../../components/LoginPage/LoginPage';
import WeatherPage from '../WeatherPage/WeatherPage';
import { socket } from '../../socket';
import ConnectionState from '../../components/ConnectionState/ConnectionState';
import ConnectionManager from '../../components/ConnectionManager/ConnectionManager';
import ChatForm from "../../components/ChatForm/ChatForm";
import Events from "../../components/Events/Events";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatEvents, setChatEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onChatEvent(value) {
      setChatEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat', onChatEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat', onChatEvent);
    };
  })

  return (
    <main className="App">
      {user ?
        <>
          <ConnectionState isConnected={isConnected} />
          <ConnectionManager />
          <Events events={chatEvents} />
          <ChatForm />
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route path="/" element={<WeatherPage />} />
          </Routes>
        </>
        :
        <Routes>
          <Route path="/" element={<LoginPage setUser={setUser} />} />
          <Route path="/*" element={<AuthPage setUser={setUser} />} />
        </Routes>
      }
    </main>
  );
}
