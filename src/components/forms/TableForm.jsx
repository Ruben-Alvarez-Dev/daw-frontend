import React from 'react'
import FormComponent from './FormComponent'

const TableForm = () => {
  const fields = [
    { name: 'table_name', label: 'Table Name', required: true },
    { name: 'restaurant_id', label: 'Restaurant ID', required: true },
    { name: 'capacity', label: 'Capacity', type: 'number', required: true }
  ]

  return <FormComponent type="table" fields={fields} />
}

export default TableForm
