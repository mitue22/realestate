const express = require('express');
var app = express();

var commonController = require('../controllers/common.controller');

var router = express.Router();

// States
router.route('/state')
.get(commonController.getStateList)
.post(commonController.addState)

//Cities
router.route('/cities')
.get(commonController.getAllCities)
.post(commonController.addCity)
router.get('/menu',commonController.getMenuDDList);
router.get('/role',commonController.getRoleDDList);
router.get('/cities/:state_id', commonController.getCityList)
router.delete('/city/:cityId', commonController.removeCity)
 router.get('/type', commonController.propertyTypeList);
 router.get('/list',commonController.propertyList);
//checkemail-availability
router.get('/checkemail-availability/email/:email', commonController.checkemailAvailability);

//menu Router's
router.route('/menu1List').post(commonController.getMenu1List); // List all menus
router.route('/addEditMenu').post(commonController.addMenu); // Add or edit a menu
router.route('/menu/:id').get(commonController.getMenuById); // Get a menu by ID
router.route('/menu/:id').put(commonController.updateMenu); // Update a menu by ID
router.route('/deleteMenu/:menuId').delete(commonController.deleteMenu); // Delete a menu by ID

//Role Router's
router.route('/roleList').post(commonController.getRoleList)
router.route('/addEditRole').post(commonController.addRole)
router.delete('/deleteRole/:roleId', commonController.deleteRole);
router.route('/role/:id').get(commonController.getRoleById);
router.route('/role/:id').put(commonController.updateRole);
router.get('/checkemail-availability/email/:email', commonController.checkemailAvailability)
router.get('/userDetailList', commonController.userList);

//builders
router.route('/builderList').get(commonController.getBuilderList);

//user
router.route('/addEditUser').post(commonController.addUser);
router.delete('/deleteUser/:userId', commonController.deleteUser);
router.get('/user/:id', commonController.getUserById);
router.route('/user/:id').put(commonController.updateUser);
router.get('/permissions/:id',commonController.getPermissionList);
router.route('/permissions').post(commonController.postPermission);
router.route('/permissions/delete').post(commonController.deletePermission);
router.route('/permissions/menuList/:role').get(commonController.getMenuListByPermission);
module.exports = router;