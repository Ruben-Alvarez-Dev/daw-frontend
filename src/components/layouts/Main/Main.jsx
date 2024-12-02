import { useState } from 'react'
import PropTypes from 'prop-types'
import RestaurantList from '../../RestaurantList/RestaurantList'
import RestaurantForm from '../../RestaurantForm/RestaurantForm'
import './Main.css'

const Main = ({ activeRestaurant, setActiveRestaurant }) => {
  const [updateTrigger, setUpdateTrigger] = useState(0)

  const handleRestaurantChange = () => {
    setUpdateTrigger(prev => prev + 1)
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
            onRestaurantSelect={handleRestaurantSelect}
            activeRestaurant={activeRestaurant}
            updateTrigger={updateTrigger}
          />
        </div>
      </div>
    </main>
  )
}

Main.propTypes = {
  activeRestaurant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    cuisine: PropTypes.string,
    address: PropTypes.string
  }),
  setActiveRestaurant: PropTypes.func.isRequired
}

export default Main
