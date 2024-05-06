import React from 'react';
import UserList from '../components/UserList/UserList';
import UserForm from '../components/UserForm/UserForm';

const Users = () => {
  return (
    <div className="users-page">
      <h1>Users</h1>
      <UserList />
      <UserForm />
    </div>
  );
};

export default Users;