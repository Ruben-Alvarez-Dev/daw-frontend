import { useState, useEffect } from 'react'
import './UsersList.css'

const UsersList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error))
  }, [])

  return (
    <div className="users-list-container">
      <h2 className="users-list-title">Users</h2>
      <div className="space-y-3">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3 className="user-name">{user.name}</h3>
            <p className="user-info">Email: {user.email}</p>
            <p className="user-info">Phone: {user.phone}</p>
            <span className={`user-role ${user.role}`}>{user.role}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsersList