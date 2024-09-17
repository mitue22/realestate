const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const permissionSchema = new mongoose.Schema({
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'role'
      },
    menuId: {
        type: Schema.Types.ObjectId,
        ref: 'menu'
    },
},{collection:'permission'});

module.exports = mongoose.model('permission', permissionSchema);