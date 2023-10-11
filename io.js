const jwt = require('jsonwebtoken');
const Chat = require('./models/chat');
let io;

const chats = {};

module.exports = {
    init,
    getIo
}

function init(http) {
    io = require('socket.io')(http);

    io.on('connection', function (socket) {

        socket.on('get-active', async function (token) {
            const user = await validateToken(token);
            if (!user) return;
            let chat = findChatInMemory(user);

            if (!chat) chat = await Chat.getActiveForUser(user);
            if (chat) {
                socket.join(chat._id.toString());
                chats[chat._id.toString()] = chat;
                io.to(chat._id.toString()).emit('update-chat', chat);
            }
        });

        socket.on('new-chat', async function (token) {
            const user = await validateToken(token);
            if (!user) return;
            const chat = await Chat.createForUser(user);
            chats[chat._id] = chat;
            socket.join(chat._id.toString());
            io.to(chat._id.toString()).emit('update-chat', chat);
        });

        socket.on('join-chat', async function ({ token, chatId }) {
            const user = await validateToken(token);
            if (!user) return;
            const chat = chats[chatId];
            chat.chatters.push({
                name: user.name,
                chatterId: user._id
            });
            await chat.save();
            socket.join(chat._id.toString());
            io.to(chat._id.toString()).emit('update-chat', chat);
        });

        // socket.on('move', async function ({ token, idx }) {
        //     const user = await validateToken(token);
        //     if (!user) return;
        //     let chat = findChatInMemory(user);
        //     if (!chat.board[idx]) chat.board[idx] = chat.turn;
        //     chat.winner = getWinner(chat.board);
        //     if (!chat.winner) chat.turn *= -1;
        //     await chat.save();
        //     io.to(chat._id.toString()).emit('update-chat', chat);
        // });

        socket.on('logout', async function (token) {
            const user = await validateToken(token);
            if (!user) return;
            let chat = findChatInMemory(user);
            if (!chat) chat = await Chat.getActiveForUser(user);
            if (chat) {
                socket.leave(chat._id.toString());
                const chatter = chat.chatters.find(p => p.chatterId.equals(user._id));
                chat.chatters.remove(chatter._id);
                if (!chat.chatters.length) {
                    delete chats[chat._id];
                    await Chat.findByIdAndDelete(chat._id);
                }
            }
        });
    });
}

function getIo() {
    return io;
}

function validateToken(token) {
    return new Promise(function (resolve) {
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) resolve(false);
            resolve(decoded.user);
        });
    });
}

function findChatInMemory(user) {
    let chatArr = Object.values(chats);
    const chat = chatArr.find(g => g.chatters.some(p => p.chatterId == user._id));
    return chat;
}
