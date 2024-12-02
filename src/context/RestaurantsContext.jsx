import { createContext, useContext, useReducer, useCallback } from 'react'
import { useAlert } from './AlertContext'
import PropTypes from 'prop-types'
import { restaurantsReducer, initialState } from './restaurantsReducer'
import { restaurantsService } from '../services/restaurantsService'

const RestaurantsContext = createContext()

export const RestaurantsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantsReducer, initialState)
  const { showAlert } = useAlert()

  // Acciones puras que solo modifican el estado
  const actions = {
    setRestaurants: (restaurants) => dispatch({ type: 'SET_RESTAURANTS', payload: restaurants }),
    addRestaurant: (restaurant) => dispatch({ type: 'ADD_RESTAURANT', payload: restaurant }),
    updateRestaurant: (restaurant) => dispatch({ type: 'UPDATE_RESTAURANT', payload: restaurant }),
    deleteRestaurant: (id) => dispatch({ type: 'DELETE_RESTAURANT', payload: id }),
    setActiveRestaurant: (restaurant) => dispatch({ type: 'SET_ACTIVE_RESTAURANT', payload: restaurant }),
    clearActiveRestaurant: () => dispatch({ type: 'CLEAR_ACTIVE_RESTAURANT' }),
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error })
  }

  // Servicios que manejan la lógica de negocio
  const services = {
    fetchRestaurants: useCallback(async () => {
      actions.setLoading(true)
      try {
        const data = await restaurantsService.getRestaurants()
        actions.setRestaurants(data)
      } catch (error) {
        actions.setError(error.message)
        showAlert(error.message, 'error')
      }
    }, [showAlert]),

    async createRestaurant(data) {
      actions.setLoading(true)
      try {
        const restaurant = await restaurantsService.createRestaurant(data)
        actions.addRestaurant(restaurant)
        actions.clearActiveRestaurant()
        showAlert('Restaurante creado con éxito', 'success')
        return restaurant
      } catch (error) {
        actions.setError(error.message)
        showAlert(error.message, 'error')
        throw error
      }
    },

    async updateRestaurant(id, data) {
      actions.setLoading(true)
      try {
        const restaurant = await restaurantsService.updateRestaurant(id, data)
        actions.updateRestaurant(restaurant)
        actions.clearActiveRestaurant()
        showAlert('Restaurante actualizado con éxito', 'success')
        return restaurant
      } catch (error) {
        actions.setError(error.message)
        showAlert(error.message, 'error')
        throw error
      }
    },

    async deleteRestaurant(id) {
      actions.setLoading(true)
      try {
        await restaurantsService.deleteRestaurant(id)
        actions.deleteRestaurant(id)
        showAlert('Restaurante eliminado con éxito', 'success')
      } catch (error) {
        actions.setError(error.message)
        showAlert(error.message, 'error')
        throw error
      }
    },

    selectRestaurant(restaurant) {
      actions.setActiveRestaurant(restaurant)
    },

    clearActiveRestaurant() {
      actions.clearActiveRestaurant()
    }
  }

  return (
    <RestaurantsContext.Provider 
      value={{ 
        ...state,
        ...services
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  )
}

RestaurantsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useRestaurants = () => {
  const context = useContext(RestaurantsContext)
  if (!context) {
    throw new Error('useRestaurants debe usarse dentro de un RestaurantsProvider')
  }
  return context
}
