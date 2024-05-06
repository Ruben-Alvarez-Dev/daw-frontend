import ReservationList from '../components/ReservationList/ReservationList.jsx';
import ReservationForm from '../components/ReservationForm/ReservationForm.jsx';

export const Reservations = () => {
  return (
    <div className="reservations-page">
      <h1>Reservations</h1>
      <ReservationList />
      <ReservationForm />
    </div>
  );
};