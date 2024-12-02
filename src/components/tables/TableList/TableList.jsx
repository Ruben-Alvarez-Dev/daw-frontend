import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRestaurants } from '../../../context/RestaurantsContext'
import './TableList.css'

const TableList = () => {
  const { activeRestaurant } = useRestaurants()
  const [searchTerm, setSearchTerm] = useState('')
  const [tables, setTables] = useState([])
  const [selectedZone, setSelectedZone] = useState('all')

  useEffect(() => {
    // Aquí cargaremos las mesas cuando tengamos el backend
    // Por ahora usamos datos de ejemplo
    if (activeRestaurant) {
      const mockTables = [
        { id: '1', number: 1, capacity: 4, zone: 'Terraza' },
        { id: '2', number: 2, capacity: 2, zone: 'Interior' },
        { id: '3', number: 3, capacity: 6, zone: 'Terraza' },
      ]
      setTables(mockTables)
    }
  }, [activeRestaurant])

  const filteredTables = tables.filter(table => {
    const matchesSearch = table.number.toString().includes(searchTerm.toLowerCase()) ||
                         table.zone.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesZone = selectedZone === 'all' || table.zone === selectedZone
    return matchesSearch && matchesZone
  })

  const zones = activeRestaurant?.zones || []

  return (
    <div className="table-list">
      <div className="list-header">
        <h2>Mesas Disponibles</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Buscar por número o zona..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="zone-filter"
          >
            <option value="all">Todas las zonas</option>
            {zones.map(zone => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="list-content">
        {!activeRestaurant ? (
          <div className="no-restaurant">
            Selecciona un restaurante para ver sus mesas
          </div>
        ) : filteredTables.length === 0 ? (
          <div className="no-tables">
            No hay mesas que coincidan con la búsqueda
          </div>
        ) : (
          filteredTables.map(table => (
            <div key={table.id} className="table-item">
              <div className="table-info">
                <h3>Mesa {table.number}</h3>
                <p>Capacidad: {table.capacity} personas</p>
                <p>Zona: {table.zone}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

TableList.propTypes = {
  onTableSelect: PropTypes.func
}

export default TableList
