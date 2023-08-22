import React from 'react';
import './App.css';
import { WebSocketProvider } from './contexts/WebSocketContext';

function App() {
  return (
    <WebSocketProvider>
      <h2>Patient Appointment App</h2>
    </WebSocketProvider>
  );
}

export default App;
