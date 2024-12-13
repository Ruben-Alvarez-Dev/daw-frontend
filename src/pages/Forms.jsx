import './Forms.css'
import UsersForm from '../components/UsersForm/UsersForm'
import RestaurantsForm from '../components/RestaurantsForm/RestaurantsForm'
import TablesForm from '../components/TablesForm/TablesForm'
import ReservationsForm from '../components/ReservationsForm/ReservationsForm'

const Forms = () => {
  return (
    <div className="forms-container">
      <UsersForm />
      <RestaurantsForm />
      <TablesForm />
      <ReservationsForm />
    </div>
  )
}

export default Forms
