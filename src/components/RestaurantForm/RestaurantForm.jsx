import { useState } from 'react'
import { useAlert } from '../../context/AlertContext'
import Button from '../common/Button/Button'
import './RestaurantForm.css'
import PropTypes from 'prop-types'

const RestaurantForm = ({ onRestaurantCreated, onClear, activeRestaurant }) => {
  const { showAlert } = useAlert()
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    address: '',
    phone: '',
    cif: '',
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error al crear el restaurante')
      }

      const newRestaurant = await response.json()
      showAlert('Restaurante creado con éxito', 'success')
      onRestaurantCreated(newRestaurant)
      handleClear()
    } catch (error) {
      showAlert(error.message, 'error')
    }
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
    onClear()
  }

  const handleDelete = async () => {
    if (!formData.id) {
      showAlert('Selecciona un restaurante para eliminar', 'error')
      return
    }

    try {
      const response = await fetch(`http://localhost:3001/restaurants/${formData.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Error al eliminar el restaurante')
      }

      showAlert('Restaurante eliminado con éxito', 'success')
      onRestaurantCreated()
      handleClear()
    } catch (error) {
      showAlert(error.message, 'error')
    }
  }

  return (
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
  )
}

RestaurantForm.propTypes = {
  onRestaurantCreated: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  activeRestaurant: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    cuisine: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    description: PropTypes.string
  })
}

export default RestaurantForm
