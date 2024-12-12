import UsersList from '../components/UsersList/UsersList'
import RestaurantsList from '../components/RestaurantsList/RestaurantsList'
import TablesList from '../components/TablesList/TablesList'
import './Lists.css'

const Lists = () => {
  return (
    <div className="lists-container" style={{ height: 'calc(100vh - 4rem)' }}>
      <div className="lists-item">
        <UsersList />
      </div>
      <div className="lists-item">
        <RestaurantsList />
      </div>
      <div className="lists-item">
        <TablesList />
      </div>
    </div>
  )
}

export default Lists
