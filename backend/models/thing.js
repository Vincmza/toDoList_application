const mongoose = require("mongoose")

const thingSchema = mongoose.Schema({
    description: {
        type: String, 
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    },
    creationDate: {
        type: Date, 
        default: Date.now()
    },
    userIdentifier: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Thing', thingSchema);