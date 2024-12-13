import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import './RestaurantsList.css'
import '../../pages/Lists.css'

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([])
  const { selectItem } = useSelectedItem()

  useEffect(() => {
    fetch('http://localhost:3000/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants:', error))
  }, [])

  const handleRestaurantClick = (restaurant) => {
    selectItem('restaurant', restaurant)
  }

  return (
    <div className="lists-item">
      <h2 className="list-title">Restaurants</h2>
      <div className="list-content">
        {restaurants.map(restaurant => (
          <div
            key={restaurant.restaurant_id}
            className="list-item"
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <h3>Restaurant #{restaurant.restaurant_id}</h3>
            <p>restaurant_id: {restaurant.restaurant_id}</p>
            <p>restaurant_name: {restaurant.restaurant_name}</p>
            <p>restaurant_address: {restaurant.restaurant_address}</p>
            <p>restaurant_phone: {restaurant.restaurant_phone}</p>
            <p>restaurant_supervisor_id: {restaurant.restaurant_supervisor_id}</p>
            <p>restaurant_capacity: {restaurant.restaurant_capacity}</p>
            <p>restaurant_cuisine_type: {restaurant.restaurant_cuisine_type}</p>
            <p>restaurant_rating: {restaurant.restaurant_rating}</p>
            <p>restaurant_booking_hours: {JSON.stringify(restaurant.restaurant_booking_hours)}</p>
            <p>restaurant_zones: {restaurant.restaurant_zones.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantsList
