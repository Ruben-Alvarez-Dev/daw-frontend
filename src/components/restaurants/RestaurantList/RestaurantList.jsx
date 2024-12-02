import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRestaurants } from '../../../context/RestaurantsContext'
import './RestaurantList.css'

const RestaurantList = () => {
  const { restaurants, loading, activeRestaurant, fetchRestaurants, selectRestaurant } = useRestaurants()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchRestaurants()
  }, [fetchRestaurants])

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
              className={`list-item ${activeRestaurant?.id === restaurant.id ? 'active' : ''}`}
              onClick={() => selectRestaurant(restaurant)}
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
  // activeRestaurant: PropTypes.shape({
  //   id: PropTypes.string,
  //   name: PropTypes.string,
  //   cuisine: PropTypes.string,
  //   address: PropTypes.string
  // }),
  // onRestaurantSelect: PropTypes.func.isRequired,
  // updateTrigger: PropTypes.number // Nuevo prop para forzar actualizaciones
}

export default RestaurantList
