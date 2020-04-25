const { Schema, model } = require('mongoose');

const Post = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        trim: true,
        max: 140
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Post', Post);