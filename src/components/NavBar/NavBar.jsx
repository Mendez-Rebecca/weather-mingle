import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className='Nav'>
      <div className="top">
        <span>Welcome, {user.name}</span>
      </div>
      <div className="bottom">
        <Link to="" onClick={handleLogOut} className='link'>Log Out</Link>
      </div>
    </nav>
  );
}
