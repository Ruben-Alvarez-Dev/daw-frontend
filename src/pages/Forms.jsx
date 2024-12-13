import './Forms.css'
import UsersForm from '../components/UsersForm/UsersForm'
import RestaurantsForm from '../components/RestaurantsForm/RestaurantsForm'
import TablesForm from '../components/TablesForm/TablesForm'
import ReservationsForm from '../components/ReservationsForm/ReservationsForm'

const Forms = () => {
  return (
    <div className="forms-container">
      <div className="forms-item">
        <UsersForm />
      </div>
      <div className="forms-item">
        <RestaurantsForm />
      </div>
      <div className="forms-item">
        <TablesForm />
      </div>
      <div className="forms-item">
        <ReservationsForm />
      </div>
    </div>
  )
}

export default Forms
