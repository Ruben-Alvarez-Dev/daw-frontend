import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import '../../pages/Lists.css'

const UsersList = () => {
  const [users, setUsers] = useState([])
  const { selectItem } = useSelectedItem()

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched users:', data)
        setUsers(data)
      })
      .catch(error => console.error('Error fetching users:', error))
  }, [])

  const handleUserClick = (user) => {
    console.log('Clicked user:', user)
    selectItem('user', user)
  }

  return (
    <div className="lists-item">
      <h2 className="list-title">Usuarios</h2>
      <div className="list-content">
        {users.map(user => (
          <div
            key={user.user_id}
            className="list-item"
            onClick={() => handleUserClick(user)}
          >
            <h3>Usuario #{user.user_id}</h3>
            <p>user_id: {user.user_id}</p>
            <p>user_name: {user.user_name}</p>
            <p>user_email: {user.user_email}</p>
            <p>user_phone: {user.user_phone}</p>
            <p>user_role: {user.user_role}</p>
            <p>user_created_at: {user.user_created_at}</p>
            <p>user_updated_at: {user.user_updated_at}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsersList