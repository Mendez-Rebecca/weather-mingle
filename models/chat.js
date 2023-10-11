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

chatSchema.statics.getActiveForUser = function (user) {
    return this.findOne({ 'chatters.chatterId': user._id });
}

gameSchema.statics.createForUser = async function (user) {
    const chat = new this();
    chat.chatters.push({ name: user.name, chatterId: user._id });
    await chat.save();
    return chat;
}

module.exports = mongoose.model('Chat', chatSchema);
