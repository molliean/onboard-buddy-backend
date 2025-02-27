const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const morgan = require('morgan')
const app = express();
const mongoose = require('mongoose');
const testJWTRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const profilesRouter = require('./controllers/profiles');
const boardsRouter = require('./controllers/boards');

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const allowedOrigins = ['https://main--onboard-buddy.netlify.app'];
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes go here
app.use('/test-jwt', testJWTRouter);
app.use('/users', usersRouter);
app.use('/profiles', profilesRouter);
app.use('/boards', boardsRouter);

app.listen(port, () => {
    console.log('The express app is ready!');
});