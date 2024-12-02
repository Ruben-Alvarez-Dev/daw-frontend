import { useState } from 'react'
import PropTypes from 'prop-types'
import RestaurantList from '../../restaurants/RestaurantList/RestaurantList'
import RestaurantForm from '../../restaurants/RestaurantForm/RestaurantForm'
import TableList from '../../tables/TableList/TableList'
import TableForm from '../../tables/TableForm/TableForm'
import './Main.css'

const Main = ({ activeSection, activeRestaurant, setActiveRestaurant }) => {
  const [updateTrigger, setUpdateTrigger] = useState(0)
  const [showTableForm, setShowTableForm] = useState(false)

  const handleRestaurantChange = () => {
    setUpdateTrigger(prev => prev + 1)
  }

  const handleRestaurantSelect = (restaurant) => {
    setActiveRestaurant(restaurant)
  }

  const handleFormClear = () => {
    setActiveRestaurant(null)
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'restaurants':
        return (
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
        )
      case 'tables':
        return (
          <div className="main-grid">
            <TableList />
            {showTableForm && (
              <TableForm onClose={() => setShowTableForm(false)} />
            )}
          </div>
        )
      case 'global':
        return null
      default:
        return null
    }
  }

  return (
    <main className="main-layout">
      <div className="main-content">
        {renderContent()}
      </div>
    </main>
  )
}

Main.propTypes = {
  activeSection: PropTypes.string,
  activeRestaurant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    zones: PropTypes.arrayOf(PropTypes.string)
  }),
  setActiveRestaurant: PropTypes.func
}

export default Main
