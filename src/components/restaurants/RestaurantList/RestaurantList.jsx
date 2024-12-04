import { useState, useEffect } from 'react'
import { useRestaurants } from '../../../context/RestaurantsContext'
import Card from '../../common/Card/Card'
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
    return <Card 
      header={<h2>Restaurantes</h2>}
      body={<div>Cargando restaurantes...</div>}
    />
  }

  const header = (
    <>
      <div className='title'>Lista de Restaurantes</div>
      <div className="subtitle">
        {activeRestaurant ? `Restaurante activo: ${activeRestaurant.name}` : 'No hay restaurante activo'}
      </div>
    </>
  )

  const body = (
    <>
        <input
          type="text"
          placeholder="Buscar por nombre, cocina o dirección..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

      <ul className="list">
        {filteredRestaurants.map((restaurant) => (
          <li
            key={restaurant.id}
            className={`list-item ${activeRestaurant?.id === restaurant.id ? 'active' : ''}`}
            onClick={() => selectRestaurant(restaurant)}
          >
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p className="restaurant-details">
                <span className="cuisine">{restaurant.cuisine}</span>
                <span className="address">{restaurant.address}</span>
              </p>
              {restaurant.rating && (
                <div className="rating">
                  <span>⭐ {restaurant.rating}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  )

  return <Card header={header} body={body} />
}

export default RestaurantList
