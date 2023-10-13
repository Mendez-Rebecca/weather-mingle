import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { Link } from 'react-router-dom';
import WeatherMingleLogo from '../../images/WeatherMingleLogo.png';

export default function AuthPage({ setUser }) {
  return (
    <main className="LoginPage">
      <img src={WeatherMingleLogo} alt="Logo" className='Logo' />
      <SignUpForm setUser={setUser} />
      <p className="AccountPrompt">Already have an account?</p>
      <Link to={'/'} className="LoginLink">Login</Link>
    </main>
  );
}
