const mongoose = require('mongoose');

const saveSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

const Save = mongoose.model('save', saveSchema);
module.exports = Save;