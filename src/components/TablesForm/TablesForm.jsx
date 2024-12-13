import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import '../../pages/Forms.css'

const TablesForm = () => {
  const { selectedItems } = useSelectedItem()
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    table_id: '',
    table_number: '',
    table_restaurant_id: '',
    table_zone: '',
    table_capacity: '',
    table_status: '',
    table_created_at: '',
    table_updated_at: ''
  })

  useEffect(() => {
    if (selectedItems.table) {
      setFormData(selectedItems.table)
      setEditMode(false)
    }
  }, [selectedItems.table])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/tables/${formData.table_id}`, {
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

  if (!selectedItems.table) {
    return <div className="forms-item">No hay mesa seleccionada</div>
  }

  return (
    <div className="forms-item">
      <h2>Mesa #{formData.table_number}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>table_id:</label>
          <input
            type="text"
            name="table_id"
            value={formData.table_id}
            disabled
          />
        </div>
        <div className="form-group">
          <label>table_number:</label>
          <input
            type="text"
            name="table_number"
            value={formData.table_number}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>table_restaurant_id:</label>
          <input
            type="text"
            name="table_restaurant_id"
            value={formData.table_restaurant_id}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>table_zone:</label>
          <select
            name="table_zone"
            value={formData.table_zone}
            onChange={handleInputChange}
            disabled={!editMode}
          >
            <option value="">Selecciona una zona</option>
            <option value="interior">Interior</option>
            <option value="exterior">Exterior</option>
            <option value="terraza">Terraza</option>
          </select>
        </div>
        <div className="form-group">
          <label>table_capacity:</label>
          <input
            type="number"
            name="table_capacity"
            value={formData.table_capacity}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>table_status:</label>
          <select
            name="table_status"
            value={formData.table_status}
            onChange={handleInputChange}
            disabled={!editMode}
          >
            <option value="">Selecciona un estado</option>
            <option value="available">Disponible</option>
            <option value="occupied">Ocupada</option>
            <option value="reserved">Reservada</option>
            <option value="maintenance">Mantenimiento</option>
          </select>
        </div>
        <div className="form-group">
          <label>table_created_at:</label>
          <input
            type="text"
            name="table_created_at"
            value={formData.table_created_at}
            disabled
          />
        </div>
        <div className="form-group">
          <label>table_updated_at:</label>
          <input
            type="text"
            name="table_updated_at"
            value={formData.table_updated_at}
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
                  setFormData(selectedItems.table)
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

export default TablesForm
