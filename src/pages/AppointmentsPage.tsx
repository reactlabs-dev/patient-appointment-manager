import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import AppointmentList from '../components/appointment-list/AppointmentList';
import { Appointment, useWebSocket } from '../contexts/WebSocketContext';

const AppointmentsPage: React.FC = () => {
  const { sendMessage } = useWebSocket();

  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    patient: ''
  });

  const handleAddAppointment = () => {
    const appointmentId = Math.random().toString(36).substring(7); // Simple ID generation
    const newAppt: Appointment = {
      id: appointmentId,
      date: new Date().toString(),
      doctor: newAppointment.doctor,
      patient: newAppointment.patient
    };

    sendMessage({
      type: 'NEW_APPOINTMENT',
      payload: newAppt,
    });
  };

  return (
    <section style={{ padding: 20 }}>
      <h2>Schedule Appointments</h2>
      <div>
        <TextField 
          label="Doctor's Name"
          value={newAppointment.doctor}
          onChange={(e) => setNewAppointment(prev => ({ ...prev, doctor: e.target.value }))}
        />
        <TextField 
          label="Patient's Name"
          value={newAppointment.patient}
          onChange={(e) => setNewAppointment(prev => ({ ...prev, patient: e.target.value }))}
        />
        <Button variant="contained" color="primary" onClick={handleAddAppointment}>
          Add Appointment
        </Button>
      </div>
      <AppointmentList />
    </section>
  );
}

export default AppointmentsPage;
