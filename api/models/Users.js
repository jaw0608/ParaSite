const mongoose = require('mongoose');

/* Mongoose */
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String
});

//Model
const User = mongoose.model('User', userSchema);

/* User method definitions */
userSchema.methods.findLogin = function (cb) {
    return this.model('User').find({ username: this.username, password: this.password }, cb);
}
userSchema.methods.checkRegistration = function (cb) {
    return this.model('User').find({ email: this.email }, cb);
}

module.exports = mongoose.model('User', userSchema);