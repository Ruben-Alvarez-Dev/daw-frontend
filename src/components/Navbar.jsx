import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './Navbar.css';

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <nav className='navbar'>
      
        <Link to="/">Home</Link>
      

      <Link to="/reservation">Make a reservation</Link>
        {
          user && (
            <>
                <Link to="/dashboard">Dashboard</Link>
                <span>{user.displayName || user.email}</span>
            </>
          )
        }
        {
          !user ? (
            <Link to="/login">Login</Link>
          ) : (
              <button onClick={handleLogout}>Logout</button>
          )
        }
    </nav>
  );
}

export default Navbar;