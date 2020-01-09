const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

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
            if (user != {}) {
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
    },

    forgotEmail: async (req, res, next) => {
        try {
            // Get the email from the user, subject and text
            let user = await User.findOne({ email: req.body.email });
            console.log(user);
            return user;
        } catch (err) {
            next(err);
        }
    }
};