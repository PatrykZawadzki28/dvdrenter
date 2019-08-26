const dbConn = require('../config').dbConnection;

const dbConfig = {
    url: dbConn,
    options: {}
}

module.exports = dbConfig;