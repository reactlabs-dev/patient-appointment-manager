import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useWebSocket } from '../../contexts/WebSocketContext';

const AppointmentList: React.FC = () => {
  const { state, sendMessage } = useWebSocket();

  const handleConfirm = (appointmentId: string) => {
    sendMessage({
      type: 'CONFIRM_APPOINTMENT',
      payload: { appointmentId }
    });
  }

  const handleReschedule = (appointmentId: string, newDate: string) => {
    sendMessage({
      type: 'RESCHEDULE_APPOINTMENT',
      payload: { appointmentId, newDate }
    });
  }

  const handleCancel = (appointmentId: string) => {
    sendMessage({
      type: 'CANCEL_APPOINTMENT',
      payload: { appointmentId }
    });
  }

  const appointments = state.appointments;

  return (
    <div style={{ padding: 20 }}>
      {appointments.map(appointment => (
        <Card key={appointment.id} style={{ marginBottom: 20 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Doctor: {appointment.doctor}
            </Typography>
            <Typography variant="h5" component="div">
              Patient: {appointment.patient}
            </Typography>
            <Typography variant="body2">
              Date: {appointment.date} 
              {/* Using Intl for better date formatting */}
            </Typography>
            <Button onClick={() => handleConfirm(appointment.id)}>Confirm</Button>
            <Button onClick={() => handleCancel(appointment.id)}>Cancel</Button>
            <Button onClick={() => handleReschedule(appointment.id, new Date().toString())}>Reschedule</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AppointmentList;
