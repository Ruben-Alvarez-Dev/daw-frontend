import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

export const Navbar = () => {
  
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state); 

  const onLogout = () => {
    navigate('/login', {
      replace: true,
      state: { logged: false } 
  });


  }
  
  return (
    <>
      <header>
        
        <h3>
          <Link to="/">Logo Link</Link>
        </h3>


        {
          state?.logged ? (
            <div className='user'>
              <span className='username'>{ state?.name }</span>
              <button className='btn-logout' onClick={onLogout}>Logout</button>
            </div>  
          ) : (
            <nav>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </nav>
          )
        }

      </header>
      <Outlet />
    </>
  )
}
 