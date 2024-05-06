import { TableList } from '../components/TableList/TableList.jsx';
import { TableForm } from '../components/TableForm/TableForm.jsx';

export const Tables = () => {
  return (
    <div className="tables-page">
      <h1>Tables</h1>
      <TableList />
      <TableForm />
    </div>
  );
};