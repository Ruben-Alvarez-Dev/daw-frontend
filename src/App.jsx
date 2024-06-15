import './App.css'
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className='app'>
      <h1>Reservas de Restaurante</h1>
      <div className='dashboard-container'>
        <Dashboard />
      </div>
    </div>
  );
};

export default App;