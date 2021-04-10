const User = require('../models/user');
const Token = require('../models/token');
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
            let idVariable = (req.params.id == undefined ? req.body.id : req.params.id);
            let user = await User.findOne({_id: idVariable});
            return user;
        } catch (err) {
            next(err);
        }
    },

    checkToken: async (req, res, next) => {
        try {
            let token = await Token.findOne({ refreshToken: req.body.refreshToken });
            return token;
        } catch(err) {
            next(err);
        }
    },

    logout: async (req, res, next) => {
        try {
            await Token.deleteMany({ refreshToken: req.body.refreshToken });
            return true;
        } catch (err) {
            next(err);
        }
    }

};