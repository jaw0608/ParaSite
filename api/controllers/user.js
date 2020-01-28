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
                    return user;
                } else {
                    return null;
                }
            } else {
                return null;
            };
        } catch (err) {
            next(err);
        }
    },

    getUserByEmail: async (req, res, next) => {
        try {
            // Get the email from the user, subject and text
            let user = await User.findOne({ email: req.body.email });
            return user;
        } catch (err) {
            next(err);
        }
    },

    getUserByID: async (req, res, next) => {
        try {
            let user = await User.findOne({_id: req.body.id});
            return user;
        } catch (err) {
            next(err);
        }
    }
};