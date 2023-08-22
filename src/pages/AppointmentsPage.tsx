import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import AppointmentList from '../components/appointment-list/AppointmentList';
import { useWebSocket } from '../contexts/WebSocketContext';

interface Appointment {
  id: string;
  date: Date;
  doctor: string;
  patient: string;
}

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { sendMessage } = useWebSocket();

  // Placeholder state for creating a new appointment
  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    patient: ''
  });

  const handleAddAppointment = () => {
    const appointmentId = Math.random().toString(36).substring(7);  // Simple ID generation, consider a more robust method for production
    const newAppt = {
      id: appointmentId,
      date: new Date(),
      doctor: newAppointment.doctor,
      patient: newAppointment.patient
    };

    setAppointments(prev => [...prev, newAppt]);
    sendMessage({
      type: 'NEW_APPOINTMENT',
      payload: { appointmentId }
    });
  }

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
        <Button onClick={handleAddAppointment}>Add Appointment</Button>
      </div>
      <AppointmentList appointments={appointments} />
    </section>
  );
}

export default AppointmentsPage;
