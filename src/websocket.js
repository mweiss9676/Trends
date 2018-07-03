import { socket } from './index';

export const otherMiddleware = store => next => action => {
    socket.on('captain', function(data) {
        console.log(`the message is: ${data}`);
    })
    socket.on('nerd', function(data) {
        console.log(`nerd says ${data}`)
    })
    next(action);
}

export const captainMiddleware = store => next => action => {
    if(action.type === 'SET_CAPTAIN') {
        socket.emit('setCaptain', socket.id)
    }
    next(action)
}