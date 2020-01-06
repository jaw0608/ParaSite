const User = require('../models/user');
const bcrypt = require('bcrypt');

/* User method definitions */
module.exports = {
    checkRegistration: async (req, res, next) => {
        try {
            const exists = await User.exists({ email: req.email });
            if (!exists) {
                return true;
            } else {
                return false;
            };
        } catch (err) {
            next(err);
        }
    },

    checkLogin: async (req, res, next) => {
        try {
            const user = await User.findOne({ username: req.body.username});
            console.log("Checking login");
            console.log(user);
            exists = true;
            if (exists) {
                //If user exists
                if (await bcrypt.compare(req.body.password, user.password)) {
                    //If password entered matches hashed password on db
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            };
        } catch (err) {
            next(err);
        }
    }
};