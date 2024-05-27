import {ReservationList} from '../components/Reservation/ReservationList.jsx';
import {ReservationForm} from '../components/Reservation/ReservationForm.jsx';
import '../components/Reservation/ReservationPage.css';

export const Reservations = () => {
  return (
    <div className="reservation-page page">
      <h2>Reservation Page</h2>
      <ReservationList />
      <ReservationForm />
    </div>
  );
};