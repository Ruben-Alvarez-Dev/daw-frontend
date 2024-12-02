import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRestaurants } from '../../../context/RestaurantsContext'
import Button from '../../common/Button/Button'
import Modal from '../../common/Modal/Modal'
import './TableForm.css'

const initialFormState = {
  number: '',
  capacity: '',
  zone: ''
}

const TableForm = ({ onClose }) => {
  const { activeRestaurant } = useRestaurants()
  const [formData, setFormData] = useState(initialFormState)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.number) newErrors.number = 'El número de mesa es requerido'
    if (!formData.capacity) newErrors.capacity = 'La capacidad es requerida'
    if (!formData.zone) newErrors.zone = 'La zona es requerida'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    // Aquí iría la lógica para guardar la mesa
    console.log('Guardando mesa:', formData)
    setShowConfirmModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleClear = () => {
    setFormData(initialFormState)
    setErrors({})
  }

  if (!activeRestaurant) {
    return (
      <div className="table-form">
        <div className="error-message">
          Selecciona un restaurante para gestionar sus mesas
        </div>
      </div>
    )
  }

  return (
    <div className="table-form">
      <h2>Gestionar Mesa</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="number">Número de Mesa</label>
            <input
              type="number"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              placeholder="Ej: 1"
            />
            {errors.number && <span className="error-message">{errors.number}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="capacity">Capacidad</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              placeholder="Ej: 4"
            />
            {errors.capacity && <span className="error-message">{errors.capacity}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="zone">Zona</label>
            <select
              id="zone"
              name="zone"
              value={formData.zone}
              onChange={handleInputChange}
            >
              <option value="">Selecciona una zona</option>
              {activeRestaurant.zones?.map(zone => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
            {errors.zone && <span className="error-message">{errors.zone}</span>}
          </div>
        </div>

        <div className="button-group">
          <Button type="button" variant="secondary" onClick={handleClear}>
            Limpiar
          </Button>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
          <Button type="button" variant="danger" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </form>

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Mesa Guardada"
        content="La mesa se ha guardado correctamente."
        onConfirm={() => {
          setShowConfirmModal(false)
          handleClear()
          onClose()
        }}
      />
    </div>
  )
}

TableForm.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default TableForm
