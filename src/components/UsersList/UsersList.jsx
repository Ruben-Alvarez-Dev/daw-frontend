import { useState, useEffect } from 'react'
import '../../pages/Lists.css'

const UsersList = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error))
  }, [])

  const handleUserClick = (user) => {
    setSelectedUser(selectedUser?.id === user.id ? null : user)
  }

  return (
    <div className="lists-item">
      <h2 className="list-title">Users</h2>
      <div className="list-content">
        {users.map(user => (
          <div
            key={user.id}
            className={`list-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
            onClick={() => handleUserClick(user)}
          >
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <span className={`user-role ${user.role}`}>{user.role}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsersList