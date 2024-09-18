const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const builderSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pincode: { type:Number,require},
    state: {
        type: Schema.Types.ObjectId,
        ref: 'States'
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City'
    },
    location: { type: String, required: true },
    
}, { collection: 'builder' });

module.exports = mongoose.model('builder', builderSchema);
