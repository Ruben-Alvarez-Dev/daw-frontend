import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import '../../pages/Lists.css'

const TablesList = () => {
  const [tables, setTables] = useState([])
  const [selectedZone, setSelectedZone] = useState('all')
  const { selectItem } = useSelectedItem()

  useEffect(() => {
    fetch('http://localhost:3000/tables')
      .then(response => response.json())
      .then(data => setTables(data))
      .catch(error => console.error('Error fetching tables:', error))
  }, [])

  const handleTableClick = (table) => {
    selectItem('table', {...table})
  }

  const zones = ['all', ...new Set(tables.map(table => table.table_zone))]
  const filteredTables = selectedZone === 'all' 
    ? tables 
    : tables.filter(table => table.table_zone === selectedZone)

  return (
    <div className="lists-item">
      <h2 className="list-title">Tables</h2>
      <div className="zones-container">
        {zones.map(zone => (
          <button
            key={zone}
            className={`zone-button ${selectedZone === zone ? 'selected' : ''}`}
            onClick={() => setSelectedZone(zone)}
          >
            {zone.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="list-content">
        {filteredTables.map(table => (
          <div
            key={table.table_id}
            className="list-item"
            onClick={() => handleTableClick(table)}
          >
            <h3>Table #{table.table_id}</h3>
            <p>table_id: {table.table_id}</p>
            <p>table_name: {table.table_name}</p>
            <p>table_restaurant_id: {table.table_restaurant_id}</p>
            <p>table_zone: {table.table_zone}</p>
            <p>table_capacity: {table.table_capacity}</p>
            <p>table_status: {table.table_status}</p>
            <p>table_position: x={table.table_position.x}, y={table.table_position.y}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TablesList
