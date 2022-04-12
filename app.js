const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/user');
const departmentRoutes = require('./routes/department');
const employeeRoutes = require('./routes/employee');
const router = require('./routes/user');
const bodyParser = require('body-parser');
const ApplicationError = require('./errors/applicationError');
const { verifyAuth } = require('./middleware/verifyAuth');
const { errorHandlerMiddleware } = require('./middleware/errorHandlerMiddleware');
const { initDatabase } = require('./database/initDatabase')
const version = 'v1';

initDatabase();
const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(verifyAuth);

app.use(`/api/${version}/user`, userRoutes);
app.use(`/api/${version}/department`, departmentRoutes);
app.use(`/api/${version}/employee`, employeeRoutes);

router.use('*', () => {
    throw new ApplicationError('Page with this URI was not found', 404);
});

app.use(errorHandlerMiddleware);

module.exports = app;
