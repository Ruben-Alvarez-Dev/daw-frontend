import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import './TablesForm.css'

const TablesForm = () => {
  const { selectedItem } = useSelectedItem()
  const [formData, setFormData] = useState({
    table_id: '',
    table_name: '',
    table_restaurant_id: '',
    table_zone: 'main',
    table_capacity: '',
    table_status: 'available',
    table_position: {
      x: 1,
      y: 1
    }
  })

  useEffect(() => {
    if (selectedItem.type === 'table' && selectedItem.item) {
      setFormData({
        table_id: selectedItem.item.table_id || '',
        table_name: selectedItem.item.table_name || '',
        table_restaurant_id: selectedItem.item.table_restaurant_id || '',
        table_zone: selectedItem.item.table_zone || 'main',
        table_capacity: selectedItem.item.table_capacity || '',
        table_status: selectedItem.item.table_status || 'available',
        table_position: selectedItem.item.table_position || { x: 1, y: 1 }
      })
    }
  }, [selectedItem])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('table_position_')) {
      const coord = name.split('_')[2] // x or y
      setFormData(prev => ({
        ...prev,
        table_position: {
          ...prev.table_position,
          [coord]: parseInt(value)
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = 'http://localhost:3000/tables'
    const method = selectedItem.item ? 'PUT' : 'POST'
    const path = selectedItem.item ? `${url}/${selectedItem.item.table_id}` : url

    fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data)
      // TODO: Add success notification
    })
    .catch((error) => {
      console.error('Error:', error)
      // TODO: Add error notification
    })
  }

  return (
    <div className="tables-form-container">
      <h2>Table Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table_id">table_id:</label>
          <input
            type="number"
            id="table_id"
            name="table_id"
            value={formData.table_id || ''}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="table_name">table_name:</label>
          <input
            type="text"
            id="table_name"
            name="table_name"
            value={formData.table_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="table_restaurant_id">table_restaurant_id:</label>
          <input
            type="number"
            id="table_restaurant_id"
            name="table_restaurant_id"
            value={formData.table_restaurant_id}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="table_zone">table_zone:</label>
          <select
            id="table_zone"
            name="table_zone"
            value={formData.table_zone}
            onChange={handleChange}
          >
            <option value="main">main</option>
            <option value="terrace">terrace</option>
            <option value="bar">bar</option>
            <option value="private">private</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="table_capacity">table_capacity:</label>
          <input
            type="number"
            id="table_capacity"
            name="table_capacity"
            value={formData.table_capacity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="table_status">table_status:</label>
          <select
            id="table_status"
            name="table_status"
            value={formData.table_status}
            onChange={handleChange}
          >
            <option value="available">available</option>
            <option value="occupied">occupied</option>
            <option value="reserved">reserved</option>
            <option value="maintenance">maintenance</option>
          </select>
        </div>

        <div className="form-group">
          <label>table_position:</label>
          <div className="position-inputs">
            <div>
              <label htmlFor="table_position_x">x:</label>
              <input
                type="number"
                id="table_position_x"
                name="table_position_x"
                value={formData.table_position.x}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div>
              <label htmlFor="table_position_y">y:</label>
              <input
                type="number"
                id="table_position_y"
                name="table_position_y"
                value={formData.table_position.y}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>
        </div>
        
        <button type="submit" className="submit-button">
          {selectedItem.item ? 'Update Table' : 'Create Table'}
        </button>
      </form>
    </div>
  )
}

export default TablesForm
