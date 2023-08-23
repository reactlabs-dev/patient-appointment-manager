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
  };

  const handleReschedule = (appointmentId: string, newDate: string) => {
    sendMessage({
      type: 'RESCHEDULE_APPOINTMENT',
      payload: { appointmentId, newDate }
    });
  };

  const handleCancel = (appointmentId: string) => {
    sendMessage({
      type: 'CANCEL_APPOINTMENT',
      payload: { appointmentId }
    });
  };

  return (
    <div style={{ padding: 20 }}>
      {state.appointments.map(appointment => (
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
            </Typography>
            <Button onClick={() => handleConfirm(appointment.id)} disabled={appointment.status === 'cancelled'}>Confirm</Button>
            <Button onClick={() => handleCancel(appointment.id)} disabled={appointment.status === 'cancelled'}>Cancel</Button>
            <Button onClick={() => handleReschedule(appointment.id, new Date().toString())}>Reschedule</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AppointmentList;
