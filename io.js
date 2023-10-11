let io;

module.exports = {
    init,
    getIo
}

function init(http) {
    io = require('socket.io')(http);

    io.on('connection', function (socket) { //on connection we fire this function

        socket.on('chat-message', async function (data) {  //change get-active to send message
            data.chat.messages.push(data.msg)
            io.emit('update-chat', data.chat);
        });
    });
}

function getIo() {
    return io;
}
