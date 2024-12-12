import { useState, useEffect } from 'react'
import './TablesList.css'

const TablesList = () => {
  const [tables, setTables] = useState([])
  const [zones, setZones] = useState([])
  const [activeZone, setActiveZone] = useState('all')

  useEffect(() => {
    fetch('http://localhost:3000/tables')
      .then(response => response.json())
      .then(data => {
        setTables(data)
        const uniqueZones = [...new Set(data.map(table => table.zone))]
        setZones(uniqueZones)
      })
      .catch(error => console.error('Error fetching tables:', error))
  }, [])

  return (
    <div className="tables-list-container">
      <h2 className="tables-list-title">Tables</h2>
      <div className="tabs">
        <button
          className={`tab-button ${activeZone === 'all' ? 'active' : ''}`}
          onClick={() => setActiveZone('all')}
        >
          All
        </button>
        {zones.map(zone => (
          <button
            key={zone}
            className={`tab-button ${zone === activeZone ? 'active' : ''}`}
            onClick={() => setActiveZone(zone)}
          >
            {zone}
          </button>
        ))}
      </div>
      <div className="tables-list-content">
        {tables.filter(table => activeZone === 'all' || table.zone === activeZone).map(table => (
          <div key={table.id} className="table-card">
            <h3 className="table-name">{table.name}</h3>
            <p className="table-info">Seats: {table.seats}</p>
            <span className="table-zone">Zone: {table.zone}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TablesList
