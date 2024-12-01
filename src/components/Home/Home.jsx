import React, { useState, useEffect } from 'react';
import './Home.css';
import restaurants from '../../../../data/restaurants.json';

const Home = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    setRestaurantList(restaurants);
  }, []);

  return (
    <div className="home">
      <h2>Available Restaurants</h2>
      <div className="restaurant-grid">
        {restaurantList.map((restaurant, index) => (
          <div key={index} className="restaurant-card">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.location}</p>
            <p>{restaurant.cuisine}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
