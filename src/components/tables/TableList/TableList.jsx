import React from 'react'
import PropTypes from 'prop-types'
import './TableList.css'

const TableList = ({ 
  activeRestaurant, 
  tables, 
  activeTable, 
  onSelect,
  searchTerm,
  onChangeSearchTerm 
}) => {
  return (
    <div className="card table-list">
      <div className="header-section">
        <h2>Mesas Disponibles</h2>
        {activeRestaurant ? (
          <div className="active-restaurant">
            <span>Restaurante:</span>
            <strong>{activeRestaurant.name}</strong>
          </div>
        ) : (
          <div className="active-restaurant">
            <span>Selecciona un restaurante</span>
          </div>
        )}
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar por número o zona..."
          value={searchTerm}
          onChange={onChangeSearchTerm}
          className="search-input"
        />
      </div>

      <div className="list-section">
        <ul className="list">
          {tables.map((table) => (
            <li
              key={table.id}
              className={`list-item ${activeTable?.id === table.id ? 'active' : ''}`}
              onClick={() => onSelect(table)}
            >
              <div className="table-info">
                <h3>Mesa {table.number}</h3>
                <p>Capacidad: {table.capacity} - Zona: {table.zone}</p>
                <p className={`status ${table.status}`}>
                  {table.status === 'available' ? 'Disponible' : 
                   table.status === 'occupied' ? 'Ocupada' : 'Reservada'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

TableList.propTypes = {
  activeRestaurant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  tables: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    number: PropTypes.number,
    capacity: PropTypes.number,
    zone: PropTypes.string,
    status: PropTypes.string
  })).isRequired,
  activeTable: PropTypes.shape({
    id: PropTypes.string
  }),
  onSelect: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onChangeSearchTerm: PropTypes.func.isRequired
}

export default TableList
