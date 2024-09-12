import {io} from 'socket.io-client';

let socket = null;

export const initSocket = async () => {
    if (socket) return socket;

    const options = {
        forceNew: true,
        reconnectionAttempts: 'Infinity',
        timeout: 10000,
        transports: ['websocket']
    };

    socket = io(process.env.REACT_APP_BACKEND_URL, options);
    return socket;
};
