import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import WeatherMingleLogo from '../../images/WeatherMingleLogo.png';

export default function LoginForm({ setUser }) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate()

    function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const user = await usersService.login(credentials);
            setUser(user);
        } catch {
            setError('Log In Failed - Try Again');
        }
        navigate('/')
    }

    return (
        <div>
            <img src={WeatherMingleLogo} alt="Logo" className='Logo' />
            <div className="form-container">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
                    <label>Password</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                    <button type="submit" className="LoginButton">LOGIN</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
            <p className="AccountPrompt">Need to sign up?</p>
            <Link to={'/login'} className="LoginLink">Sign Up</Link>
        </div>
    );
}
