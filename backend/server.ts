import express from 'express';
import http from 'http';
import WebSocket, { Server } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    ws.on('message', (message: string) => {
        console.log('Received message:', message);
        
        // For now, just echo the received message back to the client
        ws.send(message);
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
