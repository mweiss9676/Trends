import { socket } from './index';

export const otherMiddleware = store => next => action => {
    next(action);
    socket.on('captain', function(data) {
        console.log(`the message is: ${data}`);
    })
    socket.on('nerd', function(data) {
        console.log(`nerd says ${data}`)
    })
}