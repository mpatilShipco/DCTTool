const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
var cors = require('cors')

const config = require('./config')
const port = process.env.PORT || 3000 

const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema
const crypto = require('crypto')

const app = express()

app.use(cors())
app.options('*', cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.set('jwt-secret', config.secret)

app.get('/', (req, res) => {
    res.send('Hello JWT')
})

app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})

/* =======================
    CONNECT TO MONGODB SERVER
==========================*/
  mongoose.connect(config.mongodbUri)
  mongoose.Promise = global.Promise
  const db = mongoose.connection
  db.on('error', console.error)
  db.once('open', ()=>{
      console.log('connected to mongodb server')
  })

const User = require('./models/user')

//Login Start
app.post('/login', (req, res) => {
    //res.send('POST JWT test')
    
    const {username, password} = req.body
    const secret = req.app.get('jwt-secret')

    // check the user info & generate the jwt
    const check = (user) => {
        if(!user) {
            // user does not exist
            throw new Error('login failed')
        } else {
            // user exists, check the password
            if(user.verify(password)) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            username: user.username,
                             admin: user.admin
                        }, 
                        secret, 
                        {
                            expiresIn: '7d',
                            issuer: 'wwa.com',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token) 
                        })
                })
                return p
            } else {
                throw new Error('login failed')
            }
        }
    }

    // respond the token 
    const respond = (token) => {
        res.json({
            message: 'logged in successfully',
            token
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    // find the user
    User.findOneByUsername(username)
    .then(check)
    .then(respond)
    .catch(onError)

})


app.updatenew = (req, res) => {
	//res.send('PUT Called');
  try {

  // read the token from header or url
  //const token = req.header('authorization');
  //const token = req.headers['authorization'].replace(/^JWT\s/, '');
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'not logged in'
    })
  }

  
  const decodedToken = jwt.verify(token, req.app.get('jwt-secret'));

  //console.log('decodedToken');
  //console.log(decodedToken);

  //console.log('jwt-secret');
  //console.log(req.app.get('jwt-secret'));

  //console.log('p == ');
  //console.log(p);

  //console.log('req.body = ');
  //console.log(req.body);

  const filter = { username: req.body.username };
  const update = { password: req.body.password };

  let doc = User.findOneAndUpdate(filter, update, {
    new: true
  });

      const userId = decodedToken._id;
    if (req.body._id && req.body._id !== userId) {
      throw 'Invalid user ID';
    } else {
      res.json({
        message: 'Password change successfully'
      })
    }  

  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }

}


app.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}