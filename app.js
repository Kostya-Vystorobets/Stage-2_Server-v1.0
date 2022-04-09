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
const { seedDatabase } = require("./sederDatabase")

const version = 'v1';
require('dotenv').config();

const initDatabase = async () => {
    try {
        await seedDatabase();
        // await mongoose.connect(process.env.mongoURI);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error(error);
    }
};

initDatabase();


// const { Seeder } = require('mongo-seeding');
// const path = require('path');

// const config = {
//     database: process.env.mongoURI,
//     dropDatabase: false,
//     dropCollections: true
// };

// const seeder = new Seeder(config);
// const newUser = seeder.readCollectionsFromPath(path.resolve("./data"));
// seeder.import(newUser);


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
