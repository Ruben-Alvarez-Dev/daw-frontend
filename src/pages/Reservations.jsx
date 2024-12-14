import React from 'react';
import ReservationList from '../components/reservation/ReservationList';
import ReservationForm from '../components/reservation/ReservationForm';

const Reservations = () => {
  return (
    <div className="container">
      <ReservationList />
      <ReservationForm />
    </div>
  );
};

export default Reservations;
