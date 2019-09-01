const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// conecting to db:
mongoose.connect('mongodb://localhost/crud-mongo')
	.then(db => console.log('database is connected'))
	.catch(err => console.log(err));

// importing Routes
const indexRoutes = require('./routes/index');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
//app.use(express.json());

// Routes
app.use('/', indexRoutes);

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')} http://localhost:${app.get('port')}
	`);
});