const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatterSchema = new Schema({
    name: String,
    chatterId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    lastReadMessage: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Message'
    }
})

const messageSchema = new Schema({
    content: String,
    sender: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})

const chatSchema = new Schema({
    chatters: [chatterSchema],
    messages: [messageSchema],
    maxHistoryLength: {
        type: Number,
        default: 100
    }
})

module.exports = mongoose.model('Chat', chatSchema);
