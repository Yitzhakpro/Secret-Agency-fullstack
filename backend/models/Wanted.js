const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wantedScheme = new Schema({
    name: {
        type: String,
        required: [true, 'Please Enter A Name.'],
        unique: true
    },
    age: {
        type: Number,
        required: [true, "Please Enter An Age (Type unknown if you don't know)"]
    },
    short_description: {
        type: String,
    },
    bounty: {
        type: Number,
        required: [true, "Please Enter A Bounty Amount"],
        min: [1000, "The Bounty Needs To Be At Least 1000"]
    }
    
}, {timestamps: true});

const Wanted = mongoose.model('Wanted', wantedScheme, 'wanteds');
module.exports = Wanted;