import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { Link } from 'react-router-dom';

export default function AuthPage({ setUser }) {
  return (
    <main>
      <h1>AuthPage</h1>
      <SignUpForm setUser={setUser} />
      <p>Already have an account?</p>
      <Link to={'/login'}>Login</Link>
    </main>
  );
}
