import React from 'react';
import RestaurantList from '../components/restaurant/RestaurantList';
import RestaurantForm from '../components/restaurant/RestaurantForm';

const Restaurants = () => {
  return (
    <div className="container">
      <RestaurantList />
      <RestaurantForm />
    </div>
  );
};

export default Restaurants;
