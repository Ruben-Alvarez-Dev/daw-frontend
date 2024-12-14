import React from 'react'
import ListComponent from './ListComponent'

const TableList = () => {
  return <ListComponent endpoint="tables" type="table" displayField="table_name" />
}

export default TableList
