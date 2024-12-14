import React from 'react'
import FormComponent from './FormComponent'

const RestaurantForm = () => {
  const fields = [
    { name: 'restaurant_name', label: 'Name', required: true },
    { name: 'cuisine', label: 'Cuisine Type', required: true },
    { name: 'address', label: 'Address', required: true }
  ]

  return <FormComponent type="restaurant" fields={fields} />
}

export default RestaurantForm
