const pool = require('../../config/database');

module.exports = {
    // here we have defined a method called create which will recieve data
    // from controller and callback function which is called from
    //  inside create method. If code is error we call first
    //   parameter and if code is success we call 2nd parameter
    create: (data, callback) => {
        pool.query(
            `insert into registration( firstName, lastName, gender, email, password, number)
                values(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getUsers: () => {
        return new Promise((resolve, reject) => {
            pool.query(`select id, firstName, lastName, gender, email, password, number from registration`,
                [],
                (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                })
        })
    },
    getUserById: (id, callback) => {
        pool.query(`select id, firstName, lastName, gender, email, password, number from registration where id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            })
    },
    updateUser: (data, callback) => {
        pool.query(`update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            })
    },
    deleteUser: (data, callback) => {
        console.log("data.id..",data.id)
        pool.query(`delete from registration where id = ?`,
            [data.id],
            (error, results, fields) => {
                console.log('error,,..', error)
                console.log(' results,..', results,)
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            })
    },
    getUsersByUserEmail: (email, callback) => {
        pool.query(
            `select * from registration where email=?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results[0]);
            }
        )
    }
}
