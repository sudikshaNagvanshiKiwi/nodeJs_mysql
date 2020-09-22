const { createPool } = require("mysql");
//
const env = require("dotenv");

env.config({ path: '../.env' })

const pool = createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10
})

pool.on('error', function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL connected")
    }
});

module.exports = pool;

//in pool u can reuse the connection, we will not again connect. we keep are connection in the pool