const mongoose = require('mongoose');
const bcrypt = require('bcryptjs/dist/bcrypt')
const { Seeder } = require('mongo-seeding');
const path = require('path');
require('dotenv').config();

const config = {
    database: process.env.mongoURI,
    databaseReconnectTimeout: 10000,
    dropDatabase: false,
    dropCollections: true
};

const transformUser = (data) => {
    console.log(`username: ${data.documents[0].username}`)
    console.log(`password: ${data.documents[0].password}`)
    const password = data.documents[0].password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashPassword = bcrypt.hashSync(password, salt)
    data.documents[0].password = hashPassword
    return data
}

const seedUser = () => {
    try {
        const seeder = new Seeder(config);
        const newUser = seeder.readCollectionsFromPath(path.resolve('./data'), { transformers: [transformUser] });
        return seeder.import(newUser);
    } catch (error) {
        console.error(error)
    }
}

const initDatabase = async () => {
    try {
        await seedUser();
        await mongoose.connect(process.env.mongoURI);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    initDatabase
}; 