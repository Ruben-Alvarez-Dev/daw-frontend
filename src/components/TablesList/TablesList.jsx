import { useState, useEffect } from 'react'
import '../../pages/Lists.css'

const TablesList = () => {
  const [tables, setTables] = useState([])
  const [selectedTable, setSelectedTable] = useState(null)
  const [selectedZone, setSelectedZone] = useState('all')

  useEffect(() => {
    fetch('http://localhost:3000/tables')
      .then(response => response.json())
      .then(data => setTables(data))
      .catch(error => console.error('Error fetching tables:', error))
  }, [])

  const handleTableClick = (table) => {
    setSelectedTable(selectedTable?.id === table.id ? null : table)
  }

  const zones = ['all', ...new Set(tables.map(table => table.zone))]
  const filteredTables = selectedZone === 'all' ? tables : tables.filter(table => table.zone === selectedZone)

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
            key={table.id}
            className={`list-item ${selectedTable?.id === table.id ? 'selected' : ''}`}
            onClick={() => handleTableClick(table)}
          >
            <h3>Table #{table.id}</h3>
            <p>Zone: {table.zone}</p>
            <p>Seats: {table.seats}</p>
            <p>Status: {table.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TablesList
