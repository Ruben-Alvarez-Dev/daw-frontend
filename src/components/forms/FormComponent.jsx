import React, { useEffect, useState } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import { api } from '../../services/api'
import './FormComponent.css'

const defaultFields = {
  users: [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Contraseña', type: 'password', required: true },
    { name: 'role', label: 'Rol', type: 'select', required: true, options: ['admin', 'supervisor', 'customer'] }
  ],
  restaurants: [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    { name: 'capacity', label: 'Capacidad', type: 'number', required: true },
    { name: 'zones', label: 'Zonas', type: 'text', required: true }
  ],
  tables: [
    { name: 'number', label: 'Número', type: 'text', required: true },
    { name: 'zone', label: 'Zona', type: 'text', required: true },
    { name: 'capacity', label: 'Capacidad', type: 'number', required: true },
    { name: 'restaurant_id', label: 'Restaurante ID', type: 'number', required: true }
  ],
  reservations: [
    { name: 'guests', label: 'Número de invitados', type: 'number', required: true },
    { name: 'date', label: 'Fecha', type: 'date', required: true },
    { name: 'time', label: 'Hora', type: 'time', required: true },
    { name: 'table_id', label: 'Mesa ID', type: 'number', required: true },
    { name: 'user_id', label: 'Usuario ID', type: 'number', required: true }
  ]
}

const FormComponent = ({ type }) => {
  const { selectedItem, setSelectedItem } = useSelectedItem()
  const [formData, setFormData] = useState({})
  const [mode, setMode] = useState('view')
  const [originalData, setOriginalData] = useState({})
  const [error, setError] = useState(null)
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    if (selectedItem?.type === type && selectedItem?.item) {
      setFormData(selectedItem.item)
      setOriginalData(selectedItem.item)
      setMode('view')
      setError(null)
      setIsNew(false)
    } else {
      setFormData({})
      setOriginalData({})
      setMode('view')
      setError(null)
      setIsNew(true)
    }
  }, [selectedItem, type])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError(null)
  }

  const handleEdit = () => {
    setMode('edit')
    setError(null)
  }

  const handleCancel = () => {
    if (isNew) {
      handleClean()
    } else {
      setFormData(originalData)
      setMode('view')
      setError(null)
    }
  }

  const handleClean = () => {
    setFormData({})
    setOriginalData({})
    setMode('view')
    setError(null)
    setIsNew(true)
    setSelectedItem({ type: null, item: null })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let result
      if (isNew) {
        // Para crear, enviamos los datos sin ID
        const dataToCreate = { ...formData }
        delete dataToCreate.id
        result = await api.create(type, dataToCreate)
      } else {
        // Para actualizar, necesitamos el ID de json-server
        const jsonServerId = selectedItem.item.id
        if (!jsonServerId) {
          throw new Error('No se encontró el ID del registro')
        }
        
        // Preparamos los datos para actualizar
        const dataToUpdate = {
          ...formData,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }
        // No enviamos el id en el body
        delete dataToUpdate.id
        
        result = await api.update(type, jsonServerId, dataToUpdate)
      }
      
      // Actualizamos el estado con el resultado
      setFormData(result)
      setOriginalData(result)
      setMode('view')
      setError(null)
      setIsNew(false)
      setSelectedItem({ type, item: result })
    } catch (error) {
      console.error('Error en handleSubmit:', error)
      setError(error.message)
    }
  }

  const handleDelete = async () => {
    const jsonServerId = selectedItem?.item?.id
    if (!jsonServerId) {
      setError('No se encontró el ID del registro')
      return
    }
    
    try {
      await api.delete(type, jsonServerId)
      handleClean()
    } catch (error) {
      console.error('Error en handleDelete:', error)
      setError(error.message)
    }
  }

  if (!type) {
    return (
      <div className="form-component">
        <h2>Selecciona un tipo de formulario</h2>
        <div className="form-type-selector">
          {Object.keys(defaultFields).map(formType => (
            <button
              key={formType}
              onClick={() => setSelectedItem({ type: formType, item: null })}
              className="form-type-button"
            >
              {formType.charAt(0).toUpperCase() + formType.slice(1)}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const fields = defaultFields[type] || []

  return (
    <div className="form-component">
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Form</h2>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <div key={field.name} className="form-field">
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                disabled={mode === 'view'}
                required={field.required}
              >
                <option value="">Selecciona una opción</option>
                {field.options?.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                disabled={mode === 'view'}
                required={field.required}
              />
            )}
          </div>
        ))}
        {error && <div className="form-error">{error}</div>}
        <div className="form-buttons">
          {mode === 'view' && (
            <>
              <button type="button" onClick={handleEdit}>Editar</button>
              <button type="button" onClick={handleClean}>Nuevo</button>
              {!isNew && <button type="button" onClick={handleDelete}>Eliminar</button>}
            </>
          )}
          {mode === 'edit' && (
            <>
              <button type="submit">Guardar</button>
              <button type="button" onClick={handleCancel}>Cancelar</button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default FormComponent
