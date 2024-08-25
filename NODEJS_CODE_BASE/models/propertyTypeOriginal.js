var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var propertyTypesOriginalSchema = new Schema({
  title: {
    type: String,
    required: true
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
    default: Date.now
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
}, { collection: 'propertyTypes' });

module.exports = mongoose.model('propertyTypes', propertyTypesOriginalSchema);