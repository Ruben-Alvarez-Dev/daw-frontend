import { Link } from "react-router-dom";

import './Navigation.css';

export const Navigation = () => {
  return (
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/landing">Landing</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/analytics">Analytics</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
  );
};
