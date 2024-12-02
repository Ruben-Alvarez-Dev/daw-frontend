import { useState, useEffect } from 'react'
import { useAlert } from '../../context/AlertContext'
import Button from '../common/Button/Button'
import Modal from '../common/Modal/Modal'
import './RestaurantForm.css'
import PropTypes from 'prop-types'

const RestaurantForm = ({ onRestaurantCreated, onClear, activeRestaurant }) => {
  const { showAlert } = useAlert()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    address: '',
    phone: '',
    cif: '',
    description: ''
  })

  useEffect(() => {
    if (activeRestaurant) {
      setFormData(activeRestaurant)
    }
  }, [activeRestaurant])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleClear = () => {
    setFormData({
      name: '',
      cuisine: '',
      address: '',
      phone: '',
      cif: '',
      description: ''
    })
    onClear?.()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const method = formData.id ? 'PUT' : 'POST'
      const url = formData.id 
        ? `http://localhost:3001/restaurants/${formData.id}`
        : 'http://localhost:3001/restaurants'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(formData.id ? 'Error al actualizar el restaurante' : 'Error al crear el restaurante')
      }

      const savedRestaurant = await response.json()
      showAlert(formData.id ? 'Restaurante actualizado con éxito' : 'Restaurante creado con éxito', 'success')
      
      // Primero notificamos el cambio
      onRestaurantCreated?.(savedRestaurant)
      // Luego limpiamos el formulario
      handleClear()
    } catch (error) {
      showAlert(error.message, 'error')
    }
  }

  const handleDelete = () => {
    if (!formData.id) {
      showAlert('Selecciona un restaurante para eliminar', 'error')
      return
    }
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/restaurants/${formData.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Error al eliminar el restaurante')
      }

      showAlert('Restaurante eliminado con éxito', 'success')
      // Primero notificamos el cambio
      onRestaurantCreated?.()
      // Luego limpiamos el formulario
      handleClear()
    } catch (error) {
      showAlert(error.message, 'error')
    } finally {
      // Siempre cerramos el modal, tanto en éxito como en error
      setIsDeleteModalOpen(false)
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
              <label htmlFor="cuisine">Tipo de Cocina:</label>
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

            <div className="form-group full-width">
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="button-group">
              <Button type="submit" variant="success">
                Guardar
              </Button>
              <Button type="button" variant="primary" onClick={handleClear}>
                Limpiar
              </Button>
              <Button type="button" variant="danger" onClick={handleDelete}>
                Eliminar
              </Button>
            </div>
          </div>
        </form>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar eliminación"
        restaurantName={formData.name}
      />
    </>
  )
}

RestaurantForm.propTypes = {
  onRestaurantCreated: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  activeRestaurant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    cuisine: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    description: PropTypes.string
  })
}

export default RestaurantForm
