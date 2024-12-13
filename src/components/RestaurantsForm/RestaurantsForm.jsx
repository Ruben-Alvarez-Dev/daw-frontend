import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import '../../pages/Forms.css'

const RestaurantsForm = () => {
  const { selectedItems } = useSelectedItem()
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    restaurant_id: '',
    restaurant_name: '',
    restaurant_address: '',
    restaurant_phone: '',
    restaurant_email: '',
    restaurant_capacity: '',
    restaurant_created_at: '',
    restaurant_updated_at: ''
  })

  useEffect(() => {
    if (selectedItems.restaurant) {
      setFormData(selectedItems.restaurant)
      setEditMode(false)
    }
  }, [selectedItems.restaurant])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/restaurants/${formData.restaurant_id}`, {
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

  if (!selectedItems.restaurant) {
    return <div className="forms-item">No hay restaurante seleccionado</div>
  }

  return (
    <div className="forms-item">
      <h2>Restaurante #{formData.restaurant_id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>restaurant_id:</label>
          <input
            type="text"
            name="restaurant_id"
            value={formData.restaurant_id}
            disabled
          />
        </div>
        <div className="form-group">
          <label>restaurant_name:</label>
          <input
            type="text"
            name="restaurant_name"
            value={formData.restaurant_name}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>restaurant_address:</label>
          <input
            type="text"
            name="restaurant_address"
            value={formData.restaurant_address}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>restaurant_phone:</label>
          <input
            type="text"
            name="restaurant_phone"
            value={formData.restaurant_phone}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>restaurant_email:</label>
          <input
            type="email"
            name="restaurant_email"
            value={formData.restaurant_email}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>restaurant_capacity:</label>
          <input
            type="number"
            name="restaurant_capacity"
            value={formData.restaurant_capacity}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>restaurant_created_at:</label>
          <input
            type="text"
            name="restaurant_created_at"
            value={formData.restaurant_created_at}
            disabled
          />
        </div>
        <div className="form-group">
          <label>restaurant_updated_at:</label>
          <input
            type="text"
            name="restaurant_updated_at"
            value={formData.restaurant_updated_at}
            disabled
          />
        </div>
        
        <div className="form-actions">
          {!editMode ? (
            <button type="button" onClick={() => setEditMode(true)} className="btn btn-primary">
              Editar
            </button>
          ) : (
            <>
              <button type="submit" className="btn btn-primary">Guardar</button>
              <button 
                type="button" 
                onClick={() => {
                  setEditMode(false)
                  setFormData(selectedItems.restaurant)
                }}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default RestaurantsForm
