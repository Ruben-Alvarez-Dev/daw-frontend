import { TableList } from '../components/Table/TableList.jsx';
import { TableForm } from '../components/Table/TableForm.jsx';
import '../components/Table/TablePage.css'

export const Tables = () => {
  return (
    <div className="table-page page">
      <h2>Table Page</h2>
      <TableList />
      <TableForm />
    </div>
  );
};