const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
    service:{
        type: String,
        required: true,
        required: true
    },
    quetion:{
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

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey