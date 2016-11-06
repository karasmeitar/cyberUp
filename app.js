var express=require('express');
var bodyParser = require('body-parser')
var app=express();
var candidates = require('./routes/candidates.js')
var cors = require('cors')


app.use(cors());

app.use(bodyParser.json());
	app.post('/api/candidate', candidates.AddCandidate);


module.exports = app;
