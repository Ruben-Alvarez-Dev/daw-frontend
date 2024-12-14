import React from 'react'
import ListComponent from './ListComponent'

const ReservationList = () => {
  return <ListComponent endpoint="reservations" type="reservation" displayField="date" />
}

export default ReservationList
