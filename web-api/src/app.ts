import * as http from 'http';
import { resolve } from 'path';
import express from 'express';
import socketio from 'socket.io';

import { BasicVehicle, start as listenForFrames } from './vehicle';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const vehicle = new BasicVehicle();

vehicle.on('updated', state => {
    io.emit('updated', { state });
});

app.get('/', (_req, res) => {
    res.sendFile(resolve(__dirname + '/../views/index.html'));
});

io.on('connection', (socket) => {
    // when a new client connects, send the state...
    io.emit('updated', { state: vehicle.getState() });

    // update the vehicle if the user changes the UI...
    socket.on('headlights', value => vehicle.setHeadlights(value));
    socket.on('indicators', value => vehicle.setIndicators(value));
    socket.on('emergency', value => vehicle.setEmergency(value));
    socket.on('siren', value => vehicle.setSiren(value));
});

server.listen(80, '0.0.0.0', () => {
    listenForFrames();
    console.log('Ready');
});
