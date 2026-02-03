const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('Connected To Database');
        })
        .catch((err) => {
            console.log('Error Connecting to Database', err);
        })
}

module.exports = connectToDB;