const getDb = require('../database/mongo').getDb;
const modelCollection = 'users';

class User {
    constructor({ email, password, token = 0 }) {
        this.email = email;
        this._id = email;
        this.password = password;
        this.token = token;
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

    static findUser(query) {
        const db = getDb();
        return db.collection(modelCollection)
            .findOne(query)
            .then(user => {
                return user;
            })
            .catch(error => {
                console.log(error);
            })
    }
}

module.exports = User;