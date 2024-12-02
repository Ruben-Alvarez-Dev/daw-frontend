import { useState, useEffect } from 'react'
import { useRestaurants } from '../../context/RestaurantsContext'
import Button from '../common/Button/Button'
import Modal from '../common/Modal/Modal'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import './RestaurantForm.css'
import PropTypes from 'prop-types'

const initialFormState = {
  name: '',
  cuisine: '',
  address: '',
  phone: '',
  cif: '',
  description: '',
  email: '',
  city: '',
  openingTime: '',
  closingTime: '',
  status: 'active',
  zones: [{ name: 'main' }]
}

const RestaurantForm = () => {
  const { 
    activeRestaurant,
    restaurants,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    clearActiveRestaurant
  } = useRestaurants()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [formData, setFormData] = useState(initialFormState)
  const [editingZoneIndex, setEditingZoneIndex] = useState(null)

  // Efecto para manejar el restaurante activo
  useEffect(() => {
    if (activeRestaurant) {
      setFormData(activeRestaurant)
    } else {
      setFormData(initialFormState)
    }
  }, [activeRestaurant])

  // Efecto para limpiar el formulario cuando la lista de restaurantes cambie
  useEffect(() => {
    if (!activeRestaurant) {
      setFormData(initialFormState)
    }
  }, [restaurants, activeRestaurant])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleZoneChange = (index, value) => {
    const newZones = [...formData.zones]
    newZones[index] = { ...newZones[index], name: value }
    setFormData(prev => ({
      ...prev,
      zones: newZones
    }))
  }

  const addZone = () => {
    setFormData(prev => ({
      ...prev,
      zones: [...prev.zones, { name: '' }]
    }))
    setEditingZoneIndex(formData.zones.length)
  }

  const removeZone = (index) => {
    if (formData.zones.length > 1) {
      const newZones = formData.zones.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        zones: newZones
      }))
    }
  }

  const toggleZoneEdit = (index) => {
    setEditingZoneIndex(editingZoneIndex === index ? null : index)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (activeRestaurant) {
        await updateRestaurant(activeRestaurant.id, formData)
      } else {
        await createRestaurant(formData)
      }
      // El formulario se limpiará automáticamente cuando el contexto actualice activeRestaurant
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleClear = () => {
    setFormData(initialFormState)
    clearActiveRestaurant()
  }

  const handleDelete = async () => {
    try {
      setIsDeleteModalOpen(false) // Cerramos el modal primero
      await deleteRestaurant(activeRestaurant.id)
      // El formulario se limpiará automáticamente cuando el contexto actualice activeRestaurant
    } catch (error) {
      console.error('Error:', error)
      setIsDeleteModalOpen(false) // Cerramos el modal incluso si hay error
    }
  }

  return (
    <>
      <div className="card restaurant-form">
        <h2>Gestionar Restaurante</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
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
              <label htmlFor="cuisine">Tipo de cocina:</label>
              <input
                type="text"
                id="cuisine"
                name="cuisine"
                value={formData.cuisine}
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
              <label htmlFor="phone">Teléfono:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">Ciudad:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Dirección:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cif">CIF:</label>
              <input
                type="text"
                id="cif"
                name="cif"
                value={formData.cif}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="openingTime">Hora de apertura:</label>
              <input
                type="time"
                id="openingTime"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="closingTime">Hora de cierre:</label>
              <input
                type="time"
                id="closingTime"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Estado:</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="maintenance">En mantenimiento</option>
              </select>
            </div>

            <div className="zones-section">
              <div className="zones-header">
                <h3>Zonas</h3>
                <button type="button" className="add-zone-button" onClick={addZone}>
                  <FaPlus /> Añadir Zona
                </button>
              </div>
              <div className="zones-list">
                {formData.zones.map((zone, index) => (
                  <div key={index} className="zone-item">
                    <input
                      type="text"
                      value={zone.name}
                      onChange={(e) => handleZoneChange(index, e.target.value)}
                      disabled={editingZoneIndex !== index}
                      placeholder="Nombre de la zona"
                    />
                    <div className="zone-actions">
                      <button
                        type="button"
                        className="zone-button"
                        onClick={() => toggleZoneEdit(index)}
                      >
                        <FaEdit />
                      </button>
                      {formData.zones.length > 1 && (
                        <button
                          type="button"
                          className="zone-button"
                          onClick={() => removeZone(index)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group description">
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="button-group">
            <Button type="submit" variant="success">
              {activeRestaurant ? 'Actualizar' : 'Crear'}
            </Button>
            <Button type="button" variant="primary" onClick={handleClear}>
              Limpiar
            </Button>
            <Button type="button" variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
              Eliminar
            </Button>
          </div>
        </form>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirmar eliminación"
        restaurantName={formData.name}
      />
    </>
  )
}

RestaurantForm.propTypes = {
  activeRestaurant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    cuisine: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    city: PropTypes.string,
    openingTime: PropTypes.string,
    closingTime: PropTypes.string,
    status: PropTypes.string
  })
}

export default RestaurantForm
