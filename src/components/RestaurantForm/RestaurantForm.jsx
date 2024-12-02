import { useState, useEffect } from 'react'
import { useRestaurants } from '../../context/RestaurantsContext'
import Button from '../common/Button/Button'
import Modal from '../common/Modal/Modal'
import './RestaurantForm.css'
import PropTypes from 'prop-types'

const initialFormState = {
  name: '',
  cuisine: '',
  address: '',
  phone: '',
  cif: '',
  description: ''
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
                {activeRestaurant ? 'Actualizar' : 'Crear'}
              </Button>
              <Button type="button" variant="primary" onClick={handleClear}>
                Limpiar
              </Button>
              <Button type="button" variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
                Eliminar
              </Button>
            </div>
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
    description: PropTypes.string
  })
}

export default RestaurantForm
