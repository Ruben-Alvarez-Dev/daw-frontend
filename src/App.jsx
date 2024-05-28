import './App.css';
import { AppRouter } from './router/AppRouter.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
    
  );
}

export default App;

