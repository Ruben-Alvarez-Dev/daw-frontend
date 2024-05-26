import { UserList } from '../components/User/UserList';
import { UserForm } from '../components/User/UserForm';
import '../components/User/UserPage.css'


export const Users = () => {
  return (
    <div className="user-page page">
      <h2>User Page</h2>
      <UserList />
      <UserForm />
    </div>
  );
};
