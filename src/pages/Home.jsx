import React from 'react';
import { useAuth } from '../context/AuthContext';

// Datos de ejemplo - En un caso real vendrían de una API
const sampleRestaurants = [
  {
    id: 1,
    name: "La Trattoria",
    cuisine: "Italian",
    rating: 4.5,
    image: "https://placehold.co/600x400/png?text=La+Trattoria",
    description: "Authentic Italian cuisine in a cozy atmosphere"
  },
  {
    id: 2,
    name: "Sushi Master",
    cuisine: "Japanese",
    rating: 4.8,
    image: "https://placehold.co/600x400/png?text=Sushi+Master",
    description: "Fresh sushi and Japanese specialties"
  },
  {
    id: 3,
    name: "El Rincón",
    cuisine: "Spanish",
    rating: 4.3,
    image: "https://placehold.co/600x400/png?text=El+Rincon",
    description: "Traditional Spanish tapas and paella"
  }
];

const Home = () => {
  const { auth } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Restaurant App</h1>
        <p>Discover the best restaurants in your area</p>
      </div>
      
      <div className="restaurants-grid">
        {sampleRestaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <img src={restaurant.image} alt={restaurant.name} />
            <div className="restaurant-info">
              <h2>{restaurant.name}</h2>
              <p className="cuisine">{restaurant.cuisine}</p>
              <div className="rating">★ {restaurant.rating}</div>
              <p className="description">{restaurant.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
