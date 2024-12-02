import { useState } from 'react'
import PropTypes from 'prop-types'
import RestaurantList from '../../RestaurantList/RestaurantList'
import RestaurantForm from '../../RestaurantForm/RestaurantForm'
import './Main.css'

const Main = ({ activeRestaurant, setActiveRestaurant }) => {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRestaurantChange = () => {
    setRefreshKey(prev => prev + 1)
    setActiveRestaurant(null)
  }

  const handleRestaurantSelect = (restaurant) => {
    setActiveRestaurant(restaurant)
  }

  const handleFormClear = () => {
    setActiveRestaurant(null)
  }

  return (
    <main className="main">
      <div className="main-content">
        <div className="main-grid">
          <RestaurantForm 
            onRestaurantCreated={handleRestaurantChange}
            onClear={handleFormClear}
            activeRestaurant={activeRestaurant}
          />
          <RestaurantList 
            key={refreshKey} 
            onRestaurantSelect={handleRestaurantSelect}
            activeRestaurant={activeRestaurant}
          />
        </div>
      </div>
    </main>
  )
}

Main.propTypes = {
  activeRestaurant: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    cuisine: PropTypes.string,
    address: PropTypes.string
  }),
  setActiveRestaurant: PropTypes.func.isRequired
}

export default Main
