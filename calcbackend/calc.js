const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
var cors = require('cors')

const config = require('./config')
const port = process.env.PORT || 8000 

//const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema
const crypto = require('crypto')

const app = express()

var bc = require('basic-calculator');
const { Validator } = require('node-input-validator');


app.use(cors())
app.options('*', cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.set('jwt-secret', config.secret)

app.get('/', (req, res) => {
    res.send('Hello CALC')
})

app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})

app.post('/plus', (req, res) => {
	//res.send(bc.add(1,2));
	//res.send('Hello CALC')	

	//console.log("hhhhhhh");

	let spltstr = req.body.calcval.split('+');
	let valone = Number(spltstr[0]);
	let valtwo = Number(spltstr[1]);

	const v = new Validator(req.body, {
	    valone: 'required|numeric',
	    valtwo: 'required|numeric'
	  });
	 
	  v.check().then((matched) => {
	    if (!matched) {
	        let a = bc.add(valone,valtwo);
			//console.log(a);
			//return res.send(a);

			return res.status(200).json({
		      success: true,
		      result: a
		    })
	    }
	  });
})


app.post('/minus', (req, res) => {
	//res.send(bc.add(1,2));
	//res.send('Hello CALC')	

	//console.log("hhhhhhh");

	let spltstr = req.body.calcval.split('-');
	let valone = Number(spltstr[0]);
	let valtwo = Number(spltstr[1]);

	const v = new Validator(req.body, {
	    valone: 'required|numeric',
	    valtwo: 'required|numeric'
	  });
	 
	  v.check().then((matched) => {
	    if (!matched) {
	        let a = bc.sub(valone,valtwo);
			//console.log(a);
			//return res.send(a);

			return res.status(200).json({
		      success: true,
		      result: a
		    })
	    }
	  });
})


app.post('/divide', (req, res) => {
	let spltstr = req.body.calcval.split('/');
	let valone = Number(spltstr[0]);
	let valtwo = Number(spltstr[1]);

	const v = new Validator(req.body, {
	    valone: 'required|numeric',
	    valtwo: 'required|numeric'
	  });
	 
	  v.check().then((matched) => {
	    if (!matched) {
	        let a = bc.div(valone,valtwo);
			//console.log(a);
			//return res.send(a);

			return res.status(200).json({
		      success: true,
		      result: a
		    })
	    }
	  });
})


app.post('/multiply', (req, res) => {
	let spltstr = req.body.calcval.split('*');
	let valone = Number(spltstr[0]);
	let valtwo = Number(spltstr[1]);

	const v = new Validator(req.body, {
	    valone: 'required|numeric',
	    valtwo: 'required|numeric'
	  });
	 
	  v.check().then((matched) => {
	    if (!matched) {
	        let a = bc.mult(valone,valtwo);
			
			return res.status(200).json({
		      success: true,
		      result: a
		    })
	    }
	  });
})


app.post('/modular', (req, res) => {
	let spltstr = req.body.calcval.split('%');
	let valone = Number(spltstr[0]);
	let valtwo = Number(spltstr[1]);

	const v = new Validator(req.body, {
	    valone: 'required|numeric',
	    valtwo: 'required|numeric'
	  });
	 
	  v.check().then((matched) => {
	    if (!matched) {
	        let a = bc.mod(valone,valtwo);
			
			return res.status(200).json({
		      success: true,
		      result: a
		    })
	    }
	  });	
	
})
