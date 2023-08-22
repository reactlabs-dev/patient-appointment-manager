import React from 'react';
import './App.css';
import { WebSocketProvider } from './contexts/WebSocketContext';
import AppointmentsPage from './pages/AppointmentsPage';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <WebSocketProvider>
      <Dashboard />
      <AppointmentsPage />
    </WebSocketProvider>
  );
}

export default App;
