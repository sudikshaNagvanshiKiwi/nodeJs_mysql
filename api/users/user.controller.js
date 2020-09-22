const { create, getUsers, getUserById,
    updateUser, deleteUser, getUsersByUserEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');

const { sign } = require('jsonwebtoken');

//routes - for creating all routes
//controller - for doing all the call operation
// service - for database operation

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        //for hash encryption
        const salt = genSaltSync(10);

        // generating hash password nd storing it in body
        body.password = hashSync(body.password, salt);

        //here inside the body password becomes encrypted one
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(500).json({
                        success: 0,
                        message: "User already exits"
                    })
                } else
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Records not found"
                })
            }
            results.password = undefined;
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getUsers: async (req, res) => {
        try {
            const result = await getUsers()
            return res.json({
                success: 1,
                data: result
            })
        } catch (e) {
            return res.json({
                success: 0,
                data: e
            })
        }
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 1,
                    message: "Failed to update user"
                })
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            })
        })
    },
    deleteUser: (req, res) => {
        const body = req.body;
        deleteUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('err,,..', err)
            console.log('results,,..', results)
            if (results.affectedRows === 0) {
                return res.json({
                    success: 0,
                    message: "Records not found"
                })
            }
            return res.json({
                success: 1,
                message: "user deleted successfully"
            })
        })
    },
    login: (req, res) => {
        const body = req.body;
        getUsersByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                res.json({
                    success: 0,
                    data: "invalid email or password"
                })
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsonwebtoken = sign({
                    result: results
                }, "qwe1234", {
                    expiresIn: '1h'
                })
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsonwebtoken
                })
            } else {
                return res.json({
                    success: 1,
                    message: "invalid email or password",
                })
            }
        })
    }

}