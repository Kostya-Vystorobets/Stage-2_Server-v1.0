const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const departmentRoutes = require('./routes/department');
const employeeRoutes = require('./routes/employee');
const router = require('./routes/user');
const bodyParser = require('body-parser');
const errorHandler = require('./errors/errorHandler');
const { verifyAuth } = require('./middleware/verifyAuth');
const { errorHandlerMiddleware } = require('./middleware/errorHandlerMiddleware');
const { checkAnyUserExist } = require('./middleware/checkAnyUserExist');
const version = 'v1';
require('dotenv').config();

mongoose.connect(process.env.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

// const initDatabase = async () => {
//     try {
//         await mongoose.connect(process.env.mongoURI);
//         console.log("Connected to MongoDB.");
//         await checkAnyUserExist();
//     } catch (error) {
//         console.error(error);
//     }
// };

// initDatabase();

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(verifyAuth);
app.use(`/api/${version}/user`, userRoutes);
app.use(`/api/${version}/department`, departmentRoutes);
app.use(`/api/${version}/employee`, employeeRoutes);

app.use((request, response, error, next) => {
    errorHandler(response, error);
});

router.use('*', (request, response) => response
    .status(404)
    .json({ message: 'Page with this URI was not found' }));


app.use(errorHandlerMiddleware);

module.exports = app;
