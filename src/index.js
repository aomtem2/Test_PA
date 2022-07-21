const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const corsOptions = require("./config/cors.js");
// const user = require("./routes/user");
const profile = require("./routes/profile.js");
const app = express();
const con = require('./config/mongose')
const port = 8000;

con().catch(err => console.log(err));
app.use(corsOptions);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', profile)


const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
