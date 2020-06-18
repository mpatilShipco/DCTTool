require('dotenv').config();

const config = require('./environment/config');
const express = require('express');
const bodyParser = require('body-parser')
var cors = require('cors')

const app = express();

app.use(
    cors({
        allowedHeaders: ['sessionId', 'Content-Type', 'master-token'],
        exposedHeaders: ['sessionId'],
        origin: '*',
        //Removed GET,
        methods: 'HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
    }),
)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const { userRouter, ratelookupTemplateRouter } = require('./route')
app.use('/api', userRouter)
app.use('/api', ratelookupTemplateRouter)

const Mongoose = require('mongoose');
// Mongoose.connect(config.db.uri, { user: config.db.username, pass: config.db.password });
Mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
Mongoose.connection.on('error', console.error);

//app.use('/api', require('./routes/api'))

app.listen(config.port, () => {
  console.log(config.dcttoolStartMessage);
});
