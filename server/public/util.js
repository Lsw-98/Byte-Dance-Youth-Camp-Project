const mysql = require('mysql');

var options = {
    db: mysql.createPool({
        localhost: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'bbs'
    })
}

module.exports = options;