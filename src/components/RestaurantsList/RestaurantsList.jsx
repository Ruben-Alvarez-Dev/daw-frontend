import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import '../../pages/Lists.css'

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([])
  const { selectItem } = useSelectedItem()

  useEffect(() => {
    fetch('http://localhost:3000/restaurants')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched restaurants:', data)
        setRestaurants(data)
      })
      .catch(error => console.error('Error fetching restaurants:', error))
  }, [])

  const handleRestaurantClick = (restaurant) => {
    console.log('Clicked restaurant:', restaurant)
    selectItem('restaurant', restaurant)
  }

  return (
    <div className="lists-item">
      <h2 className="list-title">Restaurantes</h2>
      <div className="list-content">
        {restaurants.map(restaurant => (
          <div
            key={restaurant.restaurant_id}
            className="list-item"
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <h3>Restaurante #{restaurant.restaurant_id}</h3>
            <p>restaurant_id: {restaurant.restaurant_id}</p>
            <p>restaurant_name: {restaurant.restaurant_name}</p>
            <p>restaurant_address: {restaurant.restaurant_address}</p>
            <p>restaurant_phone: {restaurant.restaurant_phone}</p>
            <p>restaurant_email: {restaurant.restaurant_email}</p>
            <p>restaurant_capacity: {restaurant.restaurant_capacity}</p>
            <p>restaurant_cuisine_type: {restaurant.restaurant_cuisine_type}</p>
            <p>restaurant_rating: {restaurant.restaurant_rating}</p>
            <p>restaurant_opening_hours: {restaurant.restaurant_opening_hours}</p>
            <p>restaurant_created_at: {restaurant.restaurant_created_at}</p>
            <p>restaurant_updated_at: {restaurant.restaurant_updated_at}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantsList
