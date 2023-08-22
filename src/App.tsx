import React from 'react';
import './App.css';
import { WebSocketProvider } from './contexts/WebSocketContext';
import AppointmentsPage from './pages/AppointmentsPage';

function App() {
  return (
    <WebSocketProvider>
      <AppointmentsPage />
    </WebSocketProvider>
  );
}

export default App;
