import React from 'react';
import { Box } from '@mui/material';
import AppointmentCard from '../appointment-card/AppointmentCard';

interface Appointment {
  doctorName: string;
  appointmentTime: Date;
  patientName: string;
  purpose: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  return (
    <Box padding="20px">
      {appointments.map((appointment, index) => (
        <AppointmentCard key={index} appointment={appointment} />
      ))}
    </Box>
  );
};

export default AppointmentList;