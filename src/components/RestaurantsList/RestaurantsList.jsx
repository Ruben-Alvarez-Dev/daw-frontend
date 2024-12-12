import { useState, useEffect } from 'react'
import './RestaurantsList.css'

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants:', error))
  }, [])

  return (
    <div className="restaurants-list-container">
      <h2 className="restaurants-list-title">Restaurants</h2>
      <div className="space-y-3">
        {restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <h3 className="restaurant-name">{restaurant.name}</h3>
            <p className="restaurant-info">Address: {restaurant.address}</p>
            <p className="restaurant-info">Phone: {restaurant.phone}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantsList
