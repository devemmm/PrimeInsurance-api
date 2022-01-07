const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    service:{
        type: String,
        required: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    creator:{
        type: String,
        trim: true,
        required: true
    },
}, {
    timestamps: true
});

const Service = mongoose.model('Service', userSchema);
module.exports = Service