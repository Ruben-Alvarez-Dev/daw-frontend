import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '../../common/Button/Button'
import Modal from '../../common/Modal/Modal'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import './TableForm.css'

const initialFormState = {
  number: '',
  capacity: '',
  zone: '',
  status: 'available'
}

const TableForm = ({ 
  activeRestaurant,
  tableFormData,
  activeTable,
  onSubmit,
  onChange,
  onClear
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedZone, setSelectedZone] = useState(null)
  const [newZoneName, setNewZoneName] = useState('')
  const [isAddingZone, setIsAddingZone] = useState(false)
  const [editingZoneIndex, setEditingZoneIndex] = useState(null)

  const handleAddZone = () => {
    if (newZoneName.trim() && activeRestaurant) {
      const updatedZones = [...(activeRestaurant.zones || []), { name: newZoneName.trim() }]
      // Aquí deberías actualizar las zonas en el contexto/estado global
      setNewZoneName('')
      setIsAddingZone(false)
    }
  }

  const handleEditZone = (index) => {
    setEditingZoneIndex(index)
    setNewZoneName(activeRestaurant.zones[index].name)
  }

  const handleUpdateZone = (index) => {
    if (newZoneName.trim() && activeRestaurant) {
      const updatedZones = activeRestaurant.zones.map((zone, i) => 
        i === index ? { ...zone, name: newZoneName.trim() } : zone
      )
      // Aquí deberías actualizar las zonas en el contexto/estado global
      setNewZoneName('')
      setEditingZoneIndex(null)
    }
  }

  const handleDeleteZone = (index) => {
    if (activeRestaurant) {
      const updatedZones = activeRestaurant.zones.filter((_, i) => i !== index)
      // Aquí deberías actualizar las zonas en el contexto/estado global
    }
  }

  return (
    <div className="card table-form">
      <div className="form-header">
        <h2>Gestionar Mesa</h2>
        <div className="name-group">
          <label htmlFor="number">Número:</label>
          <input
            type="number"
            id="number"
            name="number"
            value={tableFormData.number}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-content">
          <div className="zones-section">
            <div className="section-header">
              <h3>Zonas</h3>
              {!isAddingZone && (
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => setIsAddingZone(true)}
                >
                  <FaPlus /> Añadir Zona
                </Button>
              )}
            </div>

            {isAddingZone && (
              <div className="zone-input-group">
                <input
                  type="text"
                  value={newZoneName}
                  onChange={(e) => setNewZoneName(e.target.value)}
                  placeholder="Nombre de la zona"
                />
                <Button type="button" onClick={handleAddZone}>
                  Guardar
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => {
                    setIsAddingZone(false)
                    setNewZoneName('')
                  }}
                >
                  Cancelar
                </Button>
              </div>
            )}

            <div className="zones-list">
              {activeRestaurant?.zones?.map((zone, index) => (
                <div key={index} className="zone-item">
                  {editingZoneIndex === index ? (
                    <div className="zone-input-group">
                      <input
                        type="text"
                        value={newZoneName}
                        onChange={(e) => setNewZoneName(e.target.value)}
                      />
                      <Button type="button" onClick={() => handleUpdateZone(index)}>
                        Guardar
                      </Button>
                      <Button 
                        type="button" 
                        variant="secondary" 
                        onClick={() => {
                          setEditingZoneIndex(null)
                          setNewZoneName('')
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span>{zone.name}</span>
                      <div className="zone-actions">
                        <Button 
                          type="button" 
                          variant="icon" 
                          onClick={() => handleEditZone(index)}
                        >
                          <FaEdit />
                        </Button>
                        <Button 
                          type="button" 
                          variant="icon-danger" 
                          onClick={() => handleDeleteZone(index)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="capacity">Capacidad:</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={tableFormData.capacity}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="zone">Zona:</label>
              <select
                id="zone"
                name="zone"
                value={tableFormData.zone}
                onChange={onChange}
                required
              >
                <option value="">Selecciona una zona</option>
                {activeRestaurant?.zones?.map((zone, index) => (
                  <option key={index} value={zone.name}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Estado:</label>
              <select
                id="status"
                name="status"
                value={tableFormData.status}
                onChange={onChange}
                required
              >
                <option value="available">Disponible</option>
                <option value="occupied">Ocupada</option>
                <option value="reserved">Reservada</option>
              </select>
            </div>
          </div>

          <div className="button-group">
            <Button type="button" variant="secondary" onClick={onClear}>
              Limpiar
            </Button>
            <Button type="submit">
              {activeTable ? 'Actualizar' : 'Crear'}
            </Button>
            {activeTable && (
              <Button 
                type="button" 
                variant="danger"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Eliminar
              </Button>
            )}
          </div>
        </div>
      </form>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar eliminación"
      >
        <p>¿Estás seguro de que quieres eliminar esta mesa?</p>
        <div className="modal-actions">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => {
            // Aquí deberías llamar a la función para eliminar la mesa
            setIsDeleteModalOpen(false)
          }}>
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  )
}

TableForm.propTypes = {
  activeRestaurant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    zones: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    }))
  }),
  tableFormData: PropTypes.shape({
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    capacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    zone: PropTypes.string,
    status: PropTypes.string
  }).isRequired,
  activeTable: PropTypes.shape({
    id: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
}

export default TableForm
