import React from 'react'
import FormComponent from './FormComponent'

const ReservationForm = () => {
  const fields = [
    { name: 'user_id', label: 'User ID', required: true },
    { name: 'restaurant_id', label: 'Restaurant ID', required: true },
    { name: 'table_id', label: 'Table ID', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'time', label: 'Time', type: 'time', required: true },
    { name: 'guests', label: 'Number of Guests', type: 'number', required: true }
  ]

  return <FormComponent type="reservation" fields={fields} />
}

export default ReservationForm
