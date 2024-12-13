import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import './UsersForm.css'

const UsersForm = () => {
  const { selectedItem } = useSelectedItem()
  const [formData, setFormData] = useState({
    user_id: '',
    user_name: '',
    user_email: '',
    user_password: '',
    user_role: 'customer',
    user_phone: ''
  })

  useEffect(() => {
    if (selectedItem.type === 'user' && selectedItem.item) {
      setFormData({
        user_id: selectedItem.item.user_id || '',
        user_name: selectedItem.item.user_name || '',
        user_email: selectedItem.item.user_email || '',
        user_password: '', // No incluimos la contraseña por seguridad
        user_role: selectedItem.item.user_role || 'customer',
        user_phone: selectedItem.item.user_phone || ''
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
    const url = 'http://localhost:3000/users'
    const method = selectedItem.item ? 'PUT' : 'POST'
    const path = selectedItem.item ? `${url}/${selectedItem.item.user_id}` : url

    fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data)
      // TODO: Add success notification
    })
    .catch((error) => {
      console.error('Error:', error)
      // TODO: Add error notification
    })
  }

  return (
    <div className="users-form-container">
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user_id">user_id:</label>
          <input
            type="number"
            id="user_id"
            name="user_id"
            value={formData.user_id || ''}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="user_name">user_name:</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="user_email">user_email:</label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="user_password">user_password:</label>
          <input
            type="password"
            id="user_password"
            name="user_password"
            value={formData.user_password}
            onChange={handleChange}
            required={!selectedItem.item}
            placeholder={selectedItem.item ? '(unchanged)' : ''}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="user_role">user_role:</label>
          <select
            id="user_role"
            name="user_role"
            value={formData.user_role}
            onChange={handleChange}
          >
            <option value="customer">customer</option>
            <option value="supervisor">supervisor</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="user_phone">user_phone:</label>
          <input
            type="tel"
            id="user_phone"
            name="user_phone"
            value={formData.user_phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="submit-button">
          {selectedItem.item ? 'Update User' : 'Create User'}
        </button>
      </form>
    </div>
  )
}

export default UsersForm
