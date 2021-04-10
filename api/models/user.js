const mongoose = require('mongoose');

/* Mongoose */
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
});

//Model
const User = module.exports = mongoose.model('User', userSchema);