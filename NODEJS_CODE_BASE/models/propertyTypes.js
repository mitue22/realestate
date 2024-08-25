var mongoose = require('mongoose');
var Schema = mongoose.Schema;

propertyTypesSchema = new Schema({
    title: {
        type: String
    },
    type: {
        type: String,
         required: true,
        enum: ['residential', 'commercial', 'agricultural']
    },
    is_active: {
        type: Boolean,
        default: true
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    },
    createdOn: {
        type: Date
    }
}, { collection: 'propertyTypes' });
module.exports = mongoose.model('PropertyTypes', propertyTypesSchema);