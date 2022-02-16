const express = require('express');

const version = 'v1';
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const departmentRoutes = require('./routes/department');
const employeeRoutes = require('./routes/employee');
const router = require('./routes/user');

mongoose.connect('mongodb+srv://Admin:X%40QekgrxJ7cBkau@cluster0.xw60b.mongodb.net/Corporation?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(`/api/${version}/user`, userRoutes);
app.use(`/api/${version}/department`, departmentRoutes);
app.use(`/api/${version}/employee`, employeeRoutes);

router.use('*', (request, response) => response
    .status(404)
    .json({ message: 'Page with this URI was not found' }));

module.exports = app;
