const express = require('express');

const version = 'v1';
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user');
const departmentRoutes = require('./routes/department');
const employeeRoutes = require('./routes/employee');
const router = require('./routes/user');

mongoose.connect(process.env.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/api/${version}/user`, userRoutes);
app.use(`/api/${version}/department`, departmentRoutes);
app.use(`/api/${version}/employee`, employeeRoutes);

router.use('*', (request, response) => response
    .status(404)
    .json({ message: 'Page with this URI was not found' }));

module.exports = app;
