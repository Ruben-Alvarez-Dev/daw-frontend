import React from 'react';
import UserList from '../components/user/UserList';
import UserForm from '../components/user/UserForm';

const Users = () => {
  return (
    <div className="container">
      <UserList />
      <UserForm />
    </div>
  );
};

export default Users;
