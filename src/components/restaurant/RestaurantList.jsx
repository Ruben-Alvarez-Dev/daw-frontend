import React from 'react';
import { useAuth } from '../../context/AuthContext';

const RestaurantList = () => {
  const { setActiveRestaurant } = useAuth();
  
  const restaurants = [
    { id: 1, name: 'Restaurant 1', address: 'Address 1', phone: '123456789' },
    { id: 2, name: 'Restaurant 2', address: 'Address 2', phone: '987654321' },
  ];

  const handleSelect = (restaurant) => {
    setActiveRestaurant(restaurant);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Restaurants</h2>
        <button className="btn-primary">Add Restaurant</button>
      </div>
      <div className="card-content">
        <div className="card-list">
          {restaurants.map((restaurant) => (
            <div 
              key={restaurant.id} 
              className="card-list-item"
              onClick={() => handleSelect(restaurant)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.address}</p>
                <p>{restaurant.phone}</p>
              </div>
              <div className="card-actions">
                <button className="btn-secondary">Edit</button>
                <button className="btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
