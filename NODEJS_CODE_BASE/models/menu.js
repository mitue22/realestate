const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const menu1Schema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    icon: { type: String, required: true },
    path: { type: String, required: true }
},{collection:'menu'});

module.exports = mongoose.model('menu', menu1Schema);