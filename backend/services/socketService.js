// backend/services/socketService.js
const { Server } = require('socket.io');

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('🔗 New client connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('❌ Client disconnected:', socket.id);
        });
    });

    return io;
};

const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};

/**
 * Emit a real-time event to all connected clients.
 */
const emitEvent = (event, data) => {
    if (io) {
        io.emit(event, data);
        console.log(`📡 Event Emitted: ${event}`, data);
    }
};

module.exports = { initSocket, getIo, emitEvent };
