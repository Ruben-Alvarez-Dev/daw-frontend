import React, { useState } from 'react';
import { createReservation } from '../../services/api';
/* import './ReservationForm.css'; */

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    date: '',
    time: '',
    pax: '',
    table_id: '',
    status: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReservation(formData);
      setFormData({
        user_id: '',
        date: '',
        time: '',
        pax: '',
        table_id: '',
        status: '',
      });
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  return (
    <div className="reservation-form">
      <h2>Create Reservation</h2>
      <form onSubmit={handleSubmit}>
        {/* Render form fields */}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ReservationForm;