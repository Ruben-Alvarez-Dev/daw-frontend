import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      await saveUserData(user.uid, name, email, phone, role);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await saveUserData(user.uid, user.displayName, user.email, phone, role);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing up with Google:', error);
    }
  };

  const saveUserData = async (uid, name, email, phone, role) => {
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(useRef, { name, email, phone, role });
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  return (
    <div>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
    <button onClick={handleGoogleRegister}>Register with Google</button>
  </div>
  )
}

export default Register;