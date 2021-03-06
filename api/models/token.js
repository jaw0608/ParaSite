const mongoose = require('mongoose');

/* Mongoose */
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    refreshToken: String
});

//Model
const Token = module.exports = mongoose.model('token', tokenSchema);