import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import './UsersForm.css'

const UsersForm = () => {
  const { selectedItem } = useSelectedItem()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  })

  useEffect(() => {
    if (selectedItem.type === 'user' && selectedItem.item) {
      setFormData({
        name: selectedItem.item.name || '',
        email: selectedItem.item.email || '',
        password: '', // No incluimos la contraseña por seguridad
        role: selectedItem.item.role || 'user'
      })
    }
  }, [selectedItem])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement API call to create/update user
    console.log('Form submitted:', formData)
  }

  return (
    <div className="users-form-container">
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!selectedItem.item} // Solo requerido para nuevos usuarios
            placeholder={selectedItem.item ? '(unchanged)' : ''}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <button type="submit" className="submit-button">
          {selectedItem.item ? 'Update User' : 'Create User'}
        </button>
      </form>
    </div>
  )
}

export default UsersForm
