import { Login } from '../components/Login/LoginForm.jsx';
import '../components/Login/LoginPage.css';

export const Home = () => {
  return (
    <>
      <div className="login-page page">
        <h2>Login Page</h2>
        <Login />
    </div>
    </>
  )
}
