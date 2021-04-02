const next = require('next');
const express = require('express');
const voter = require('./routes/voter');
const company = require('./routes/company');
const candidate = require('./routes/candidate');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const exp = express();
const path = require('path');

require('dotenv').config({ path: __dirname + '/.env' });

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

exp.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
exp.use(bodyParser.json());
exp.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/pages/homepage.js'));
});

exp.use('/company', company);

exp.use('/voter', voter);

exp.use('/candidate', candidate);

const app = next({
	dev: process.env.NODE_ENV !== 'production',
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
	exp.use(handler).listen(3000, function () {
		console.log('Node server listening on port 3000');
	});
});
