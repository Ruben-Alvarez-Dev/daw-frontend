import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import '../../pages/Forms.css'

const ReservationsForm = () => {
  const { selectedItems } = useSelectedItem()
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    reservation_id: '',
    reservation_user_id: '',
    reservation_restaurant_id: '',
    reservation_table_id: '',
    reservation_date: '',
    reservation_time_slot: '',
    reservation_status: '',
    reservation_created_at: '',
    reservation_updated_at: ''
  })

  useEffect(() => {
    if (selectedItems.reservation) {
      setFormData(selectedItems.reservation)
      setEditMode(false)
    }
  }, [selectedItems.reservation])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/reservations/${formData.reservation_id}`, {
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

  if (!selectedItems.reservation) {
    return <div className="forms-item">No hay reserva seleccionada</div>
  }

  return (
    <div className="forms-item">
      <h2>Reserva #{formData.reservation_id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>reservation_id:</label>
          <input
            type="text"
            name="reservation_id"
            value={formData.reservation_id}
            disabled
          />
        </div>
        <div className="form-group">
          <label>reservation_user_id:</label>
          <input
            type="text"
            name="reservation_user_id"
            value={formData.reservation_user_id}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>reservation_restaurant_id:</label>
          <input
            type="text"
            name="reservation_restaurant_id"
            value={formData.reservation_restaurant_id}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>reservation_table_id:</label>
          <input
            type="text"
            name="reservation_table_id"
            value={formData.reservation_table_id}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>reservation_date:</label>
          <input
            type="date"
            name="reservation_date"
            value={formData.reservation_date}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <div className="form-group">
          <label>reservation_time_slot:</label>
          <select
            name="reservation_time_slot"
            value={formData.reservation_time_slot}
            onChange={handleInputChange}
            disabled={!editMode}
          >
            <option value="">Selecciona un horario</option>
            <option value="13:00">13:00</option>
            <option value="13:30">13:30</option>
            <option value="14:00">14:00</option>
            <option value="14:30">14:30</option>
            <option value="15:00">15:00</option>
            <option value="20:00">20:00</option>
            <option value="20:30">20:30</option>
            <option value="21:00">21:00</option>
            <option value="21:30">21:30</option>
            <option value="22:00">22:00</option>
          </select>
        </div>
        <div className="form-group">
          <label>reservation_status:</label>
          <select
            name="reservation_status"
            value={formData.reservation_status}
            onChange={handleInputChange}
            disabled={!editMode}
          >
            <option value="">Selecciona un estado</option>
            <option value="pending">Pendiente</option>
            <option value="confirmed">Confirmada</option>
            <option value="cancelled">Cancelada</option>
            <option value="completed">Completada</option>
          </select>
        </div>
        <div className="form-group">
          <label>reservation_created_at:</label>
          <input
            type="text"
            name="reservation_created_at"
            value={formData.reservation_created_at}
            disabled
          />
        </div>
        <div className="form-group">
          <label>reservation_updated_at:</label>
          <input
            type="text"
            name="reservation_updated_at"
            value={formData.reservation_updated_at}
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
                  setFormData(selectedItems.reservation)
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

export default ReservationsForm
