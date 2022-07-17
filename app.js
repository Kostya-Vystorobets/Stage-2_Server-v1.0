const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/user');
const departmentRoutes = require('./routes/department');
const employeeRoutes = require('./routes/employee');
const bodyParser = require('body-parser');
const ErrorException = require('./error-handler/error-exception');
const { verifyAuth } = require('./middleware/verifyAuth');
const { errorHandler } = require('./error-handler/errorHandler');
const { initDatabase } = require('./database/initDatabase');
const version = 'v1';

const app = express();

initDatabase();

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(verifyAuth);

app.use(`/api/${version}/user`, userRoutes);
app.use(`/api/${version}/department`, departmentRoutes);
app.use(`/api/${version}/employee`, employeeRoutes);

app.use('*', () => {
    throw ErrorException.NotFound();
});

app.use(errorHandler);

module.exports = app;
