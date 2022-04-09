const bcrypt = require("bcryptjs/dist/bcrypt")
const { Seeder } = require('mongo-seeding');
const path = require('path');
const { password } = require("./data/users/users");

const config = {
    database: process.env.mongoURI,
    dropDatabase: false,
    dropCollections: true
};

const seedDatabase = async () => {
    const seeder = new Seeder(config);
    const newUser = seeder.readCollectionsFromPath(path.resolve("./data"), {
        transformers: [(user) => {

            console.log(user);
            const password = user.documents[0].password
            user.documents[0].password = "Password321"

            console.log(password);
            console.log(user.documents[0].password);

            return user
        }]
    });
    console.log("test")
    console.log(newUser[0].documents[0].password)

    seeder.import(newUser);

}

module.exports = {
    seedDatabase
}; 