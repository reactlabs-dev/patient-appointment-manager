import React, { createContext, useContext, useEffect, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

export type WebSocketContextType = {
    send: (data: string) => void;
};
  
export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

type WebSocketProviderProps = {
    children: React.ReactNode;
  };
  
  const WEBSOCKET_ENDPOINT = 'ws://localhost:5000'; // Point to your backend WebSocket endpoint
  
  export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [webSocket, setWebSocket] = useState<ReconnectingWebSocket | null>(null);
  
    useEffect(() => {
      const ws = new ReconnectingWebSocket(WEBSOCKET_ENDPOINT);
      setWebSocket(ws);
  
      return () => {
        ws.close();
      };
    }, []);
  
    const send = (data: string) => {
      if (webSocket) webSocket.send(data);
    };
  
    return (
      <WebSocketContext.Provider value={{ send }}>
        {children}
      </WebSocketContext.Provider>
    );
  };
  