import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RestaurantForm.css';

const RestaurantForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    capacity: '',
    openingHours: '',
    cuisine: '',
    description: ''
  });

  useEffect(() => {
    if (isEditing) {
      // TODO: Fetch restaurant data by ID
      // setFormData(restaurantData);
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call
      if (isEditing) {
        // await updateRestaurant(id, formData);
      } else {
        // await createRestaurant(formData);
      }
      navigate('/restaurants');
    } catch (error) {
      console.error('Error saving restaurant:', error);
    }
  };

  return (
    <form className="restaurant-form" onSubmit={handleSubmit}>
      <div className="restaurant-form-header">
        <h2>{isEditing ? 'Edit Restaurant' : 'New Restaurant'}</h2>
      </div>
      
      <div className="restaurant-form-fields">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="openingHours">Opening Hours</label>
          <input
            type="text"
            id="openingHours"
            name="openingHours"
            value={formData.openingHours}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cuisine">Cuisine Type</label>
          <input
            type="text"
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
      </div>

      <div className="restaurant-form-actions">
        <button type="button" onClick={() => navigate('/restaurants')}>
          Cancel
        </button>
        <button type="submit">
          {isEditing ? 'Update' : 'Create'} Restaurant
        </button>
      </div>
    </form>
  );
};

export default RestaurantForm;
