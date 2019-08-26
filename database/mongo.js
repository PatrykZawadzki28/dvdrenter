const mongoClinet = require('mongodb').MongoClient;
const dbConfig = require('./config');
const dvds = require("./seed");
const uuidv4 = require('uuid/v4');

let db;

exports.initDbConnection = cb => {
    console.log(dbConfig.url);
    mongoClinet.connect(dbConfig.url)
        .then(client => {
            db = client.db('dvdlender');
            cb();
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
}

exports.seedDb = (cb) => {
    let collection = db.collection("dvds");

    collection
        .count()
        .then(count => {
            console.log(count)
            if (!count) {
                collection
                    .insertMany(dvds.map(dvd => ({ ...dvd, _id: uuidv4() })))
                    .then(() => cb());
            }
            else {
                cb();
            }
        });
}

exports.getDb = () => {
    if (!db) {
        throw 'DB connection was not initialized';
    }

    return db;
}

process.on('SIGINT', () => {
    dbClient.close();
    process.exit();
});