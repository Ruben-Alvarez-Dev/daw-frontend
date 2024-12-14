import React, { useEffect, useState } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import { api } from '../../services/api'
import './ListComponent.css'

const ListComponent = ({ type }) => {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const { selectedItem, setSelectedItem } = useSelectedItem()

  useEffect(() => {
    if (type) {
      loadItems()
    }
  }, [type])

  const loadItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.getList(type)
      setItems(data)
    } catch (error) {
      console.error(`Error fetching ${type}:`, error)
      setError(`Error al cargar los ${type}: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleItemClick = (item) => {
    setSelectedItem({ type, item })
  }

  const getDisplayName = (item) => {
    switch (type) {
      case 'users':
        return item.user_name
      case 'restaurants':
        return item.restaurant_name
      case 'tables':
        return `Mesa ${item.table_number}`
      case 'reservations':
        return `Reserva ${item.id} - ${item.user_name}`
      default:
        return `${type} ${item.id}`
    }
  }

  if (!type) {
    return <div className="list-component">Tipo de lista no especificado</div>
  }

  if (loading) {
    return <div className="list-component">Cargando...</div>
  }

  if (error) {
    return (
      <div className="list-component error">
        <p>{error}</p>
        <button onClick={loadItems}>Reintentar</button>
      </div>
    )
  }

  const getTitle = () => {
    const titles = {
      users: 'Usuarios',
      restaurants: 'Restaurantes',
      tables: 'Mesas',
      reservations: 'Reservas'
    }
    return titles[type] || type
  }

  return (
    <div className="list-component">
      <h2>{getTitle()}</h2>
      <div className="items-container">
        {items.map((item) => (
          <div
            key={`${type}-${item.user_name || item.restaurant_name || item.table_number || item.id}`}
            className={`list-item ${selectedItem?.item?.id === item.id ? 'selected' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            {getDisplayName(item)}
          </div>
        ))}
        {items.length === 0 && (
          <div className="no-items">No hay elementos</div>
        )}
      </div>
    </div>
  )
}

export default ListComponent
