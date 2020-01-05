const User = require('../models/user');

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
            const exists = await User.exists( {$and: [{ username: req.username},{password: req.password }]});
            // console.log
            if (exists) {
                return true;
            } else {
                return false;
            };
        } catch (err) {
            next(err);
        }
    }
};