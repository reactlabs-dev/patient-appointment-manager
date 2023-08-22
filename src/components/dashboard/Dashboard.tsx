// src/components/Dashboard.tsx

import React from 'react';
import { useWebSocket } from '../../contexts/WebSocketContext';
import { Card, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
    const { state } = useWebSocket();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', padding: 40 }}>
            <Typography variant="h6">Appointment Dashboard</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <Card style={{ padding: 20 }}>
                    <Typography>Total: {state.totalAppointments}</Typography>
                </Card>
                <Card style={{ padding: 20 }}>
                    <Typography>Confirmed: {state.confirmed}</Typography>
                </Card>
                <Card style={{ padding: 20 }}>
                    <Typography>Cancelled: {state.cancelled}</Typography>
                </Card>
                <Card style={{ padding: 20 }}>
                    <Typography>Rescheduled: {state.rescheduled}</Typography>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
