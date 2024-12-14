import React from 'react'
import FormComponent from './FormComponent'

const UserForm = () => {
  const fields = [
    { name: 'user_name', label: 'Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', required: true }
  ]

  return <FormComponent type="user" fields={fields} />
}

export default UserForm
