// src/components/Dashboard.tsx

import React from 'react';
import { useWebSocket } from '../../contexts/WebSocketContext';
import { Card, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  const { state } = useWebSocket();

  return (
    <Card>
      <Typography variant="h6">Appointment Dashboard</Typography>
      <Typography>Total Appointments: {state.totalAppointments}</Typography>
      <Typography>Confirmed: {state.confirmed}</Typography>
      <Typography>Cancelled: {state.cancelled}</Typography>
      <Typography>Rescheduled: {state.rescheduled}</Typography>
    </Card>
  );
};

export default Dashboard;
