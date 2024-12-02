export const initialState = {
  restaurants: [],
  activeRestaurant: null,
  loading: false,
  error: null
}

export const restaurantsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case 'SET_RESTAURANTS':
      return {
        ...state,
        restaurants: action.payload,
        loading: false,
        error: null
      }

    case 'ADD_RESTAURANT':
      return {
        ...state,
        restaurants: [...state.restaurants, action.payload],
        error: null
      }

    case 'UPDATE_RESTAURANT':
      return {
        ...state,
        restaurants: state.restaurants.map(restaurant =>
          restaurant.id === action.payload.id ? action.payload : restaurant
        ),
        error: null
      }

    case 'DELETE_RESTAURANT':
      return {
        ...state,
        restaurants: state.restaurants.filter(restaurant => restaurant.id !== action.payload),
        activeRestaurant: null,
        error: null
      }

    case 'SET_ACTIVE_RESTAURANT':
      return {
        ...state,
        activeRestaurant: action.payload
      }

    case 'CLEAR_ACTIVE_RESTAURANT':
      return {
        ...state,
        activeRestaurant: null
      }

    default:
      return state
  }
}
