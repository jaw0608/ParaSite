const mongoose = require('mongoose');

/* Mongoose */
const Schema = mongoose.Schema;
const roomSchema = new Schema({
    _id: Schema.Types.ObjectId,
    gameCode: {
        type: String,
        required: true
    }
});

//Model
const Room = module.exports = mongoose.model('room', roomSchema);