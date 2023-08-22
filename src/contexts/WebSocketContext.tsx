import React, { createContext, useContext, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

type WebSocketMessage = {
  type: 'NEW_APPOINTMENT' | 'RESCHEDULE_APPOINTMENT' | 'CANCEL_APPOINTMENT' | 'CONFIRM_APPOINTMENT';
  // Add more types as required
  payload: {
    appointmentId: string;
    newDate?: Date; // Optional, based on your use case
    // ... other fields as required
  };
};

export type WebSocketContextType = {
  sendMessage: (message: WebSocketMessage) => void;
};

const WEBSOCKET_ENDPOINT = 'ws://localhost:8080'; // Point to your backend WebSocket endpoint

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
    children: React.ReactNode;
  }

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const ws = useRef<ReconnectingWebSocket | null>(null);

  // Connect to the WebSocket (You can adjust the URL to your WebSocket server)
  if (!ws.current) {
    ws.current = new ReconnectingWebSocket(WEBSOCKET_ENDPOINT);
    ws.current.onopen = () => console.log('WebSocket connected');
    // Handle any messages received from the server here if needed
    ws.current.onmessage = (message) => {
      console.log('Received:', message.data);
    };
  }

  const sendMessage = (message: WebSocketMessage) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage }}>
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
