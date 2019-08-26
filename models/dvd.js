const getDb = require('../database/mongo').getDb;
const uuidv4 = require('uuid/v4');

const modelCollection = 'dvds';

class Dvd {
    constructor({ title, uid = 0, _id = 0 }) {
        this.uid = uid;
        this._id = _id || uuidv4();
        this.title = title;
    }

    create() {
        const db = getDb();
        return db.collection(modelCollection)
            .insertOne(this);
    }

    save() {
        const db = getDb();

        return db.collection(modelCollection)
            .updateOne({ _id: this._id }, { $set: this });
    }

    static findDvdById(id) {
        return this.findOne({ _id: id })
    }

    static findDvdByTitle(title) {
        return this.findOne({ title: new RegExp(title) });
    }

    static findDvdByUser(uid) {
        return this.findOne({ uid: uid });
    }

    static findOne(query) {
        const db = getDb();
        return db.collection(modelCollection)
            .findOne(query);
    }

    static list() {
        const db = getDb();
        return db.collection(modelCollection)
            .find({})
            .toArray();
    }
}

module.exports = Dvd;