import React from 'react'
import ListComponent from '../components/lists/ListComponent'
import FormComponent from '../components/forms/FormComponent'
import { SelectedItemProvider } from '../context/SelectedItemContext'
import './Pages.css'

const permissionFields = [
  { name: 'user_id', label: 'User', type: 'select', required: true },
  { name: 'table_id', label: 'Table', type: 'select', required: true },
  { name: 'can_read', label: 'Can Read', type: 'checkbox' },
  { name: 'can_write', label: 'Can Write', type: 'checkbox' },
  { name: 'can_delete', label: 'Can Delete', type: 'checkbox' }
]

const PermissionsPage = () => {
  return (
    <SelectedItemProvider>
      <div className="page-container">
        <div className="page-content">
          <div className="list-section">
            <ListComponent type="permission" />
          </div>
          <div className="form-section">
            <FormComponent 
              type="permission" 
              fields={permissionFields}
            />
          </div>
        </div>
      </div>
    </SelectedItemProvider>
  )
}

export default PermissionsPage
