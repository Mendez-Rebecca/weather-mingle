import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import LoginPage from '../../components/LoginPage/LoginPage';
import WeatherPage from '../WeatherPage/WeatherPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route path="/weather" element={<WeatherPage />} />
          </Routes>
        </>
        :
        <Routes>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/*" element={<AuthPage setUser={setUser} />} />
        </Routes>
      }
    </main>
  );
}
