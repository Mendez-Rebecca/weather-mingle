const socket = window.io();
let setChat = null;

/*--- This is so that this module can setState on App ---*/
export function registerSetChat(fn) {
    setChat = fn;
}

/*--- Listeners for messages from server ---*/
socket.on('update-chat', function (chat) {  //to receive information
    setChat(chat);
});

//house all the communications I want to make
/*--- Functions that send messages to the server ---*/
export function sendChatMessage(msg, chat, user) {              //to send information
    socket.emit('chat-message', { msg, chat, user });
}
