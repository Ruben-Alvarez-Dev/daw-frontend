import { useState, useEffect } from 'react'
import './RestaurantsList.css'
import '../../pages/Lists.css'

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants:', error))
  }, [])

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(selectedRestaurant?.id === restaurant.id ? null : restaurant)
  }

  return (
    <div className="lists-item">
      <h2 className="list-title">Restaurants</h2>
      <div className="list-content">
        {restaurants.map(restaurant => (
          <div
            key={restaurant.id}
            className={`list-item ${selectedRestaurant?.id === restaurant.id ? 'selected' : ''}`}
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <h3>{restaurant.name}</h3>
            <p>Address: {restaurant.address}</p>
            <p>Phone: {restaurant.phone}</p>
            <p>Cuisine: {restaurant.cuisine}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantsList
