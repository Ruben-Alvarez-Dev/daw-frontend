import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Reservations } from './pages/ReservationPage.jsx';
import { Users } from './pages/UserPage.jsx';
import { Tables } from './pages/TablePage.jsx';
import { Home } from './pages/HomePage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">

        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/tables">Tables</Link>
            </li>
            <li>
              <Link to="/reservations">Reservations</Link>
            </li>
          </ul>
        </nav>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/reservations" element={<Reservations />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;