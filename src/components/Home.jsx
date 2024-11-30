import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('/data/restaurants.json')
      .then(response => response.json())
      .then(data => setRestaurants(data));
  }, []);

  return (
    <div className="home">
      <h2>Available Restaurants</h2>
      <div className="restaurant-grid">
        {restaurants.map((restaurant, index) => (
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
