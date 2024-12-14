import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Restaurants = () => {
  const { setActiveRestaurant, activeItems } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });
  
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'La Tasca',
      address: 'Calle Mayor 1',
      phone: '123456789',
      email: 'latasca@email.com'
    },
    {
      id: 2,
      name: 'El Rincón',
      address: 'Plaza España 2',
      phone: '987654321',
      email: 'elrincon@email.com'
    }
  ]);

  const handleSelect = (restaurant) => {
    setActiveRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      address: restaurant.address,
      phone: restaurant.phone,
      email: restaurant.email
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeItems.restaurant) {
      // Update existing restaurant
      const updatedRestaurants = restaurants.map(restaurant => {
        if (restaurant.id === activeItems.restaurant.id) {
          const updatedRestaurant = {
            ...restaurant,
            ...formData
          };
          setActiveRestaurant(updatedRestaurant); // Update active restaurant in context
          return updatedRestaurant;
        }
        return restaurant;
      });
      setRestaurants(updatedRestaurants);
    } else {
      // Add new restaurant
      const newRestaurant = {
        id: restaurants.length + 1,
        ...formData
      };
      setRestaurants([...restaurants, newRestaurant]);
    }
    
    handleClear(); // Reset form and active restaurant
  };

  const handleDelete = (id) => {
    const updatedRestaurants = restaurants.filter(restaurant => restaurant.id !== id);
    setRestaurants(updatedRestaurants);
    if (activeItems.restaurant?.id === id) {
      handleClear();
    }
  };

  const handleClear = () => {
    setActiveRestaurant(null);
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: ''
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Restaurants</h2>
        <button className="btn-primary" onClick={handleClear}>Add Restaurant</button>
      </div>
      <div className="card-content">
        <div className="card-list">
          {restaurants.map((restaurant) => (
            <div 
              key={restaurant.id} 
              className={`card-list-item ${activeItems.restaurant?.id === restaurant.id ? 'active' : ''}`}
              onClick={() => handleSelect(restaurant)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.address}</p>
                <p>Phone: {restaurant.phone}</p>
                <p>Email: {restaurant.email}</p>
              </div>
              <div className="card-actions">
                <button 
                  className="btn-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(restaurant);
                  }}
                >
                  Edit
                </button>
                <button 
                  className="btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(restaurant.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3>{activeItems.restaurant ? 'Edit Restaurant' : 'Add Restaurant'}</h3>
        </div>
        <div className="card-content">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Restaurant Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input 
                type="tel" 
                className="form-input" 
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {activeItems.restaurant ? 'Update Restaurant' : 'Save Restaurant'}
              </button>
              {activeItems.restaurant && (
                <button type="button" className="btn-secondary" onClick={handleClear}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
