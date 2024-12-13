import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import '../../pages/Forms.css'

const UsersForm = () => {
  const { selectedItems } = useSelectedItem()
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    user_id: '',
    user_name: '',
    user_email: '',
    user_phone: '',
    user_role: '',
    user_created_at: '',
    user_updated_at: ''
  })

  useEffect(() => {
    if (selectedItems.user) {
      setFormData(selectedItems.user)
      setEditMode(false)
    }
  }, [selectedItems.user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/users/${formData.user_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data)
      setEditMode(false)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  }

  if (!selectedItems.user) {
    return <div className="forms-item">No hay usuario seleccionado</div>
  }

  return (
    <div className="forms-item">
      <h2>Usuario #{formData.user_id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>user_id:</label>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            disabled
          />
        </div>
        <div className="form-group">
          <label>user_name:</label>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>user_email:</label>
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>user_phone:</label>
          <input
            type="text"
            name="user_phone"
            value={formData.user_phone}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>user_role:</label>
          <input
            type="text"
            name="user_role"
            value={formData.user_role}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>user_created_at:</label>
          <input
            type="text"
            name="user_created_at"
            value={formData.user_created_at}
            disabled
          />
        </div>
        <div className="form-group">
          <label>user_updated_at:</label>
          <input
            type="text"
            name="user_updated_at"
            value={formData.user_updated_at}
            disabled
          />
        </div>
        
        <div className="form-actions">
          {!editMode ? (
            <button type="button" onClick={() => setEditMode(true)}>
              Editar
            </button>
          ) : (
            <>
              <button type="submit">Guardar</button>
              <button type="button" onClick={() => {
                setEditMode(false)
                setFormData(selectedItems.user)
              }}>
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default UsersForm
