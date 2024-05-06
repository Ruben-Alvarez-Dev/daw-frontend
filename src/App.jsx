import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Reservations } from './pages/Reservations.jsx';
import { Users } from './pages/Users.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/reservations">Reservations</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to DAW Frontend React</h2>
    </div>
  );
}

export default App;