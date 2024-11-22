const mysql = require('mysql2');

const pool = mysql.createPool({
    host: useRuntimeConfig().mysqlHost,
    user: useRuntimeConfig().mysqlUser,
    database: useRuntimeConfig().mysqlDatabase,
    password: useRuntimeConfig().mysqlPassword
})

module.exports = pool.promise();