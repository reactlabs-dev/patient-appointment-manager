import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface Appointment {
  doctorName: string;
  appointmentTime: Date;
  patientName: string;
  purpose: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <Card sx={{ margin: '20px 0' }}>
      <CardContent>
        <Typography variant="h6">{appointment.patientName}</Typography>
        <Typography>{appointment.doctorName}</Typography>
        <Typography>{appointment.appointmentTime.toString()}</Typography>
        <Typography>{appointment.purpose}</Typography>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
