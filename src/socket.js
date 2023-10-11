import * as tokenService from './services/tokenService';

const socket = window.io();
let setChat = null;

/*--- This is so that this module can setState on App ---*/
export function registerSetGame(fn) {
    setChat = fn;
}

/*--- Listeners for messages from server ---*/
socket.on('update-game', function (game) {
    setChat(game);
});


/*--- Functions that send messages to the server ---*/
export function getActive() {
    socket.emit('get-active', tokenService.getToken());
}

export function newChat() {
    socket.emit('new-chat', tokenService.getToken());
}

export function joinChat(chatId) {
    socket.emit('join-chat', {
        token: tokenService.getToken(),
        chatId
    });
}

// export function move(idx) {
//     socket.emit('move', {
//         token: tokenService.getToken(),
//         idx
//     });
// }

export function logout() {
    socket.emit('logout', tokenService.getToken());
}
