const User = require('../models/user');

exports.postRegisterUser = (req, res, next) => {
    if (!req.body || !req.body.email || !req.body.password) {
        res.status(40).send("Invalid data provided");
    }

    new User(req.body)
        .create()
        .then(() => res.send("User created!"));
};

exports.getLoginUser = (req, res, next) => {
    User.findUser(req.query)
        .then(user => {
            user = new User(user);

            user.token = Math.floor(Math.random() * 2000000);
            user.save()
                .then(() => res.send({ token: user.token }))
                .catch(() => res.status(401).send("Authentication failed"));
        })
};