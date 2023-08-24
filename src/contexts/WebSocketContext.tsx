import React, { createContext, useContext, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const WEBSOCKET_ENDPOINT = 'ws://localhost:8080';

export type AppointmentStatus = 'confirmed' | 'rescheduled' | 'cancelled' | 'pending';

export interface Appointment {
    id: string;
    status: AppointmentStatus;
    date: string;
    doctor: string;
    patient: string;
  }

type WebSocketState = {
    totalAppointments: number;
    confirmed: number;
    cancelled: number;
    rescheduled: number;
    appointments: Appointment[];
}

const initialState: WebSocketState = {
    totalAppointments: 0,
    confirmed: 0,
    cancelled: 0,
    rescheduled: 0,
    appointments: []
}

type WebSocketMessage = {
    type: 'NEW_APPOINTMENT' | 'RESCHEDULE_APPOINTMENT' | 'CANCEL_APPOINTMENT' | 'CONFIRM_APPOINTMENT';
    payload: {
      appointmentId?: string;
      newDate?: string;
      id?: string;
      status?: AppointmentStatus;
      date?: string;
      doctor?: string;
      patient?: string;
    };
  };

export type WebSocketContextType = {
  state: WebSocketState;
  sendMessage: (message: WebSocketMessage) => void;
};

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
    children: React.ReactNode;
  }

  // const reducer = (state: WebSocketState, action: WebSocketMessage): WebSocketState => {
  //   console.log('Current State:', state);
  //   console.log('Action', action);
  //   switch (action.type) {
  //     case 'NEW_APPOINTMENT':
  //       const newAppt: Appointment = {
  //           id: action.payload.id!,
  //           status: action.payload.status!,
  //           date: action.payload.date!,
  //           doctor: action.payload.doctor!,
  //           patient: action.payload.patient!,
  //       };
  //       return { ...state, totalAppointments: state.totalAppointments + 1,
  //       appointments: [...state.appointments, newAppt ]};
  //     case 'CONFIRM_APPOINTMENT':
  //       return { ...state, confirmed: state.confirmed + 1 };
  //     case 'CANCEL_APPOINTMENT':
  //       return { ...state, cancelled: state.cancelled + 1 };
  //     case 'RESCHEDULE_APPOINTMENT':
  //       return { ...state, rescheduled: state.rescheduled + 1 };
  //     default:
  //       return state;
  //   }
  // };

  const reducer = (state: WebSocketState, action: WebSocketMessage): WebSocketState => {
    console.log('Current State:', state);
    console.log('Action', action);
    switch (action.type) {
      case 'NEW_APPOINTMENT':
        const newAppt: Appointment = {
          id: action.payload.id!,
          status: action.payload.status!,
          date: action.payload.date!,
          doctor: action.payload.doctor!,
          patient: action.payload.patient!,
        };
        return { 
          ...state, 
          totalAppointments: state.totalAppointments + 1,
          appointments: [...state.appointments, newAppt]
        };
      case 'CONFIRM_APPOINTMENT':
        const confirmAppointments = state.appointments.map(appointment => {
          if (appointment.id === action.payload.appointmentId) {
            return { ...appointment, status: 'confirmed' };
          }
          return appointment;
        });
        return {
          ...state,
          confirmed: state.confirmed + 1,
          appointments: confirmAppointments as Appointment[],
        };
      case 'CANCEL_APPOINTMENT':
        const updatedAppointments = state.appointments.map(appointment => {
          if (appointment.id === action.payload.appointmentId) {
            return { ...appointment, status: 'cancelled' };
          }
          return appointment;
        });
        return { 
          ...state, 
          cancelled: state.cancelled + 1,
          appointments: updatedAppointments as Appointment[],
        };
      case 'RESCHEDULE_APPOINTMENT':
        const rescheduledAppointments = state.appointments.map(appointment => {
          if (appointment.id === action.payload.appointmentId) {
            return { ...appointment, status: 'rescheduled' };
          }
          return appointment;
        });
        return {
          ...state,
          rescheduled: state.rescheduled + 1,
          appointments: rescheduledAppointments as Appointment[],
        };
      default:
        return state;
    }
  };
  

  export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const ws = useRef<ReconnectingWebSocket | null>(null);
    const [state, dispatch] = React.useReducer(reducer, initialState);
  
    // Connect to the WebSocket (You can adjust the URL to your WebSocket server)
    if (!ws.current) {
      ws.current = new ReconnectingWebSocket(WEBSOCKET_ENDPOINT);

      // logging for connection events
      ws.current.addEventListener('open', () => {
        console.log('Websocket connected.');
      });

      ws.current.addEventListener('error', (event) => {
        console.log('Websocket error:', event);
      });

      ws.current.addEventListener('close', (event) => {
        console.log(`Websocket closed with code ${event.code}. Reason: ${event.reason}`);
      });

      ws.current.addEventListener('message', (event) => {
        console.log('Received message', event.data);
      });

      ws.current.onopen = () => console.log('WebSocket connected');
      ws.current.onmessage = (message) => {
          console.log('Received WebSocket message:', message.data);
          if (message.data instanceof Blob) {
            message.data.text().then(textData => {
                const jsonData = JSON.parse(textData);
                dispatch({ type: jsonData.type, payload: jsonData.payload });
            });
        } else {
            const data: WebSocketMessage = JSON.parse(message.data);
            dispatch({ type: data.type, payload: data.payload });
        }

      };
    }
  
    const sendMessage = (message: WebSocketMessage) => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(message));
      }
    };
  
    return (
      <WebSocketContext.Provider value={{ state, sendMessage }}>
        {children}
      </WebSocketContext.Provider>
    );
  };

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
