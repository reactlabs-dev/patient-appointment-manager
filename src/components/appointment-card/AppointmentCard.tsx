import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Appointment } from '../../contexts/WebSocketContext'; // Importing the type

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {

  return (
    <Card sx={{ margin: '20px 0' }}>
      <CardContent>
        <Typography variant="h6">{appointment.patient}</Typography>
        <Typography>{appointment.doctor}</Typography>
        <Typography>
          {new Intl.DateTimeFormat('en-US').format(new Date(appointment.date))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
