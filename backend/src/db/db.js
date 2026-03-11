const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.log("Mongo Error:", err));
}

module.exports = connectToDB;