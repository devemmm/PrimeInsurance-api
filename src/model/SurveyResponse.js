const mongoose = require('mongoose');

const surveyResponseSchema = mongoose.Schema({
    id:{
        type: String,
        required: true,
        required: true
    },
    service:{
        type: String,
        trim: true,
        required: true
    },
    quetion:{
        type: String,
        trim: true,
        required: true
    },
    customerName:{
        type: String,
        trim: true,
        required: true
    },
    customerPhone:{
        type: String,
        trim: true,
        required: true
    },
    answer:{
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema);

module.exports = SurveyResponse