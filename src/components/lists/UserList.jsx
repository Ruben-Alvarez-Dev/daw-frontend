import React from 'react'
import ListComponent from './ListComponent'

const UserList = () => {
  return <ListComponent endpoint="users" type="user" displayField="user_name" />
}

export default UserList
