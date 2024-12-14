import React from 'react'
import ListComponent from '../components/lists/ListComponent'
import FormComponent from '../components/forms/FormComponent'

const userFields = [
  { name: 'user_name', label: 'Username', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'role', label: 'Role', type: 'text', required: true },
  { name: 'active', label: 'Active', type: 'checkbox' }
]

const UsersPage = () => {
  return (
    <div className="display">
      <div className="list-container">
        <ListComponent type="users" />
      </div>
      <div className="form-container">
        <FormComponent type="users" fields={userFields} />
      </div>
    </div>
  )
}

export default UsersPage
