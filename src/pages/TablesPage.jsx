import React from 'react'
import ListComponent from '../components/lists/ListComponent'
import FormComponent from '../components/forms/FormComponent'
import { SelectedItemProvider } from '../context/SelectedItemContext'
import './Pages.css'

const tableFields = [
  { name: 'table_name', label: 'Table Name', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'text' },
  { name: 'schema', label: 'Schema', type: 'text', required: true }
]

const TablesPage = () => {
  return (
    <SelectedItemProvider>
      <div className="page-container">
        <div className="page-content">
          <div className="list-section">
            <ListComponent type="table" />
          </div>
          <div className="form-section">
            <FormComponent type="table" fields={tableFields} />
          </div>
        </div>
      </div>
    </SelectedItemProvider>
  )
}

export default TablesPage
