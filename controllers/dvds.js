const Dvd = require('../models/dvd');

exports.postRentDvd = (req, res, next) => {
    if (!req.body || !req.body.id || !req.body.uid) {
        res.status(400).send("Invalid data provided");
    }

    Dvd.findDvdById(req.body.id)
        .then(dvd => {
            dvd = new Dvd(dvd);

            if (!dvd) {
                res.status(404).send("Dvd not found");
                return;
            }

            if (dvd.uid) {
                res.status(403).send("Already rented!");
                return;
            }

            dvd.uid = req.body.uid;

            dvd.save()
                .then(() => res.send("Rented!"))
                .catch(() => res.status(401).send("Renting failed"));
        });
};

exports.postReturnDvd = (req, res, next) => {
    if (!req.body || !req.body.id || !req.body.uid) {
        res.status(400).send("Invalid data provided");
    }

    Dvd.findDvdById(req.body.id)
        .then(dvd => {
            dvd = new Dvd(dvd);

            if (!dvd) {
                res.status(404).send("Dvd not found");
                return;
            }

            if (!dvd.uid || dvd.uid !== req.body.uid) {
                res.status(403).send("Was not rented by you!");
                return;
            }

            dvd.uid = 0;

            dvd.save()
                .then(() => res.send("Returned!"))
                .catch(() => res.status(401).send("Returning failed"));
        });
};

exports.getDvds = (req, res, next) => {
    Dvd.list()
        .then(dvds => res.send(dvds));
};