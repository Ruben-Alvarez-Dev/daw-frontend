import React from 'react'
import ListComponent from './ListComponent'

const RestaurantList = () => {
  return <ListComponent endpoint="restaurants" type="restaurant" displayField="restaurant_name" />
}

export default RestaurantList
