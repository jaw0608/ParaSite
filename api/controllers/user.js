const User = require('../models/user');

/* User method definitions */
module.exports = {
    checkRegistration: async (req, res, next) => {
        try {
            console.log(User);
            console.log("email", req.email);
            const exists = await User.count({ email: req.email }, function(err, count) {
                if (!err) {
                    if (count) {
                        // return true;
                        res.send(200).send("Approved!");
                        return true;
                    } else {
                        // return false;
                        res.send(400).send("Not approved!");
                        return false;
                    }
                }
            });
            res.status(201).send(exists);
            // res.status(200).send("Exists!");
        } catch (err) {
            next(err);
        }
    },

    checkLogin: async (req, res, next) => {
        const exists = await User.exists({ username: req.username, password: req.password });
        return (exists ? true : false);
    }
};