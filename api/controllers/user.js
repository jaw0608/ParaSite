const User = require('../models/user');
const Token = require('../models/token');
const bcrypt = require('bcrypt');

/* User method definitions */
module.exports = {
    /**
     * Checks whether an account exists in the database already exists in database -> called during account registration
     * @param {*} req Express req object
     * @param {*} res Express res object
     * @param {*} next Express next object
     * @returns {boolean} Whether account exists in MongoDB
     */
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

    /**
     * Checks MongoDB if the credentials are valid
     * @param {*} req Express req object
     * @param {*} res Express res object
     * @param {*} next Express next object
     * @returns {boolean} true if valid login, else false
     */
    checkLogin: async (req, res, next) => {
        try {
            // console.log('36')
            // console.log(req.body);
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

    /**
     * Checks if user exists in DB by email
     * @param {*} req Express req object
     * @param {*} res Express res object
     * @param {*} next Express next object
     * @returns {Object} User object
     */
    getUserByEmail: async (req, res, next) => {
        try {
            // Get the email from the user, subject and text
            console.log(req.body)
            let user = await User.findOne({ email: req.body.email });
            return user;
        } catch (err) {
            next(err);
        }
    },

    /**
     * Gets user by ID number
     * @param {*} req Express req object
     * @param {*} res Express res object
     * @param {*} next Express next object
     * @returns {Object} User object
     */
    getUserByID: async (req, res, next) => {
        try {
            let idVariable = (req.params.id == undefined ? req.body.id : req.params.id);
            let user = await User.findOne({_id: idVariable});
            return user;
        } catch (err) {
            next(err);
        }
    },

    /**
     * Checks if token is still valid
     * @param {*} req Express req object
     * @param {*} res Express res object
     * @param {*} next Express next object
     * @returns {Object} token
     */
    checkToken: async (req, res, next) => {
        try {
            let token = await Token.findOne({ refreshToken: req.body.refreshToken });
            return token;
        } catch(err) {
            next(err);
        }
    },

    /**
     * Logs the user out - removes tokens from db
     * @param {*} req Express req object
     * @param {*} res Express res object
     * @param {*} next Express next object
     * @returns {boolean} returns true if successfully logged out
     */
    logout: async (req, res, next) => {
        try {
            await Token.deleteMany({ refreshToken: req.body.refreshToken });
            return true;
        } catch (err) {
            next(err);
        }
    },
    
    /**
     * 
     * @param {*} req Express req object
     * @param {*} res Express res object
     * @param {*} next Express next object
     * @returns User object if found
     */
    updateProfilePic: async (req, res, next) => {
        try {
            let user = await User.findOne({ email: req.body.user.email });
            user.profilePicture = req.body.profilePicture;
            await user.save();
            return user;
        } catch(err) {
            next(err);
        }
    }

};