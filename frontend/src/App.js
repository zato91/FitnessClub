import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Container } from 'reactstrap'

function App() {
  return (
    <Container >
        <Login />
        <Dashboard />
    </Container>
  );
}

export default App;
