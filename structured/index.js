require('dotenv').config()

const config = require('./environment/config')
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')

const app = express()
//const router = express.Router()

app.use(
    cors({
        allowedHeaders: ['sessionId', 'Content-Type', 'master-token'],
        exposedHeaders: ['sessionId'],
        origin: '*',
        //Removed GET,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
    }),
)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//const { userRouter, ratelookupTemplateRouter } = require('./route/api')
// router.use('/api/login', userRouter)
// router.use('/api', ratelookupTemplateRouter)
//app.use('/api', require('./route/api'))

// router.get('/', function (req, res) {
//   res.send('GET NOT ALLOWED');
// })

// // About page route.
// router.post('/api', function (req, res) {
//   res.send('POST NOT ALLOWED');
// })

// module.exports = router;


app.get('/', (req, res) => {
    res.send('GET NOT ALLOWED')
})

// app.post('/api/login', (req, res) => {
//     res.send('POST IN ALLOWED')
//     console.log("comes in")
//     app.use('/api', require('./route/api'))
// })



const Mongoose = require('mongoose');
// Mongoose.connect(config.db.uri, { user: config.db.username, pass: config.db.password });
Mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
Mongoose.connection.on('error', console.error);

app.listen(config.port, () => {
  console.log(config.dcttoolStartMessage);
});
