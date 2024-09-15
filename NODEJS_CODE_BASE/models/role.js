const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
}, { collection: 'role' });

module.exports = mongoose.model('role', roleSchema);
