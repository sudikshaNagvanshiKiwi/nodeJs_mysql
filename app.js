
require("dotenv").config();
const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');

//convert req object to json object
app.use(express.json())

//any request will come will be passed the this router
app.use("/api/users", userRouter);

const port = process.env.PORT || 3000;

app.listen( port, () => {
    console.log(`Server is running on port ${port}`);
})