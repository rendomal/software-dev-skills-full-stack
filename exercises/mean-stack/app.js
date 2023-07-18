const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const session = require('express-session');

// Connect to database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
})

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
})

const app = express();

const users = require('./routes/users');

const PORT = process.env.PORT || 5000;

// Port Number
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(session({
  		secret: 'supersecret',
  		resave: false,
  		saveUninitialized: true,
  		cookie: { secure: true }
		}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.end("Invalid endpoint");
});

// Route anything that's not defined to index page
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});