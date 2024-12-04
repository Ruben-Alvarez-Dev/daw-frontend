import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Card from '../../common/Card/Card'
import List from '../../common/List/List'
import './Dashboard.css'

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [stats] = useState([
    { id: 1, title: 'Reservas Totales', value: '156' },
    { id: 2, title: 'Restaurantes Activos', value: '23' },
    { id: 3, title: 'Mesas Disponibles', value: '45' },
    { id: 4, title: 'Usuarios Registrados', value: '89' },
  ])

  const filteredStats = stats.filter((stat) =>
    Object.values(stat).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const renderStatItem = (stat) => (
    <div className="stat-info">
      <h4>{stat.title}</h4>
      <p className="stat-value">{stat.value}</p>
    </div>
  )

  return (
    <Card
      style={{ maxWidth: '100%' }}
      header={
        <>
          <span className="label title">Dashboard Estadísticas</span>
          <span className="label subtitle">Resumen general del sistema</span>
          <hr />
        </>
      }
      body={
        <>
          <div className="search-container">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar estadísticas..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
          </div>
          <List
            items={filteredStats}
            renderItem={renderStatItem}
            className="stats-list"
          />
        </>
      }
    />
  )
}

export default Dashboard
