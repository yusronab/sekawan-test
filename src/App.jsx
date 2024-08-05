import './styles/App.css'
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Ticket from './pages/Ticket';

function App() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path="/" element={<Home />} />
        <Route path="/ticket" element={<Ticket />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
