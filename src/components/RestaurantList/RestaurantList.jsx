import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './RestaurantList.css'

const RestaurantList = ({ activeRestaurant, onRestaurantSelect, updateTrigger }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:3001/restaurants')
        if (!response.ok) {
          throw new Error('Error al cargar los restaurantes')
        }
        const data = await response.json()
        setRestaurants(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [updateTrigger]) // Ahora se ejecuta cuando updateTrigger cambia

  const filteredRestaurants = restaurants.filter(restaurant => {
    const searchTermLower = searchTerm.toLowerCase()
    return (
      restaurant.name.toLowerCase().includes(searchTermLower) ||
      restaurant.cuisine.toLowerCase().includes(searchTermLower) ||
      restaurant.address.toLowerCase().includes(searchTermLower)
    )
  })

  if (loading) {
    return <div className="card">Cargando restaurantes...</div>
  }

  if (error) {
    return <div className="card">Error: {error}</div>
  }

  return (
    <div className="card restaurant-list">
      <div className="header-section">
        <h2>Restaurantes Disponibles</h2>
        {activeRestaurant ? (
          <div className="active-restaurant">
            <span>Restaurante activo:</span>
            <strong>{activeRestaurant.name}</strong>
          </div>
        ) : (
          <div className="active-restaurant">
            <span>No hay un restaurante activo</span>
          </div>
        )}
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar por nombre, cocina o dirección..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="list-section">
        <ul className="list">
          {filteredRestaurants.map((restaurant) => (
            <li
              key={restaurant.id}
              className="list-item"
              onClick={() => onRestaurantSelect(restaurant)}
            >
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.cuisine} - {restaurant.address}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

RestaurantList.propTypes = {
  activeRestaurant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    cuisine: PropTypes.string,
    address: PropTypes.string
  }),
  onRestaurantSelect: PropTypes.func.isRequired,
  updateTrigger: PropTypes.number // Nuevo prop para forzar actualizaciones
}

export default RestaurantList
