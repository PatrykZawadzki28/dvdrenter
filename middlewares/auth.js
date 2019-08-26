const User = require('../models/user');

exports.authMiddleware = (req, res, next) =>
    User.findUser({ token: Number(req.query.token) })
        .then(user => {
            if (user) {
                req.body = { ...(req.body || {}), uid: user._id };
                next();
                return;
            }

            res.status(401).send("Invalid token");
        });

