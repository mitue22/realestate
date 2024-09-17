const mongoose = require('mongoose');
var state_model = require('../models/state');
var city_model = require('../models/city');
var menu1_model = require('../models/menu')
var users = require('../models/users');
const role_model = require('../models/role');
var propertyTypeOriginal_model = require('../models/propertyTypeOriginal');
var property_model = require('../models/property');
var permission_model=require('../models/permission');
module.exports = {
    propertyList: (req, res) => {
        const filters =  req.body;
        let query = {};
        console.log(filters,"filters");
        if (filters.propertyFor) {
            query['propertyFor'] = filters.propertyFor;
          }
          if (filters.city) {
            query['city'] = filters.city;
          }
          if (filters.type) {
            query['type'] = filters.type;
          }
          const page = filters.page || 1;
          const pageSize = filters.pageSize || GlobalEnum.PageSize;
          const skip = (page - 1) * pageSize;
          property_model.countDocuments(query, (err, totalRecord) => {
            if (err) {
                return res.status(400).send(err);
            }
    
            property_model.find(query)
            .populate('city', 'name')
            .populate('type', 'title')
            .skip(skip)
            .limit(pageSize)
            .exec((err, data) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.status(200).send({
                        totalCount: totalRecord, // Return the total count
                        data: data               // Return the paginated data
                    });
                }
            });
        });
    },
    //PropertyType
    propertyTypeList: (req, res) => {
        propertyTypeOriginal_model.find().exec((err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send(data);
            }
        });
    },
    // STATES
    getStateList: (req, res) => {
        state_model.find({ is_active: true })
            .exec((err, data) => {
                if (err)
                    res.status(400).send(err);
                res.status(200).send(data);
            });
    },
    getRoleDDList:(req,res) =>{
        role_model.find({ is_active: true })
            .exec((err, data) => {
                if (err)
                    res.status(400).send(err);
                res.status(200).send(data);
            });
    },
    getMenuDDList:(req,res) =>{
        menu1_model.find({ is_active: true })
            .exec((err, data) => {
                if (err)
                    res.status(400).send(err);
                res.status(200).send(data);
            });
    },
    addState: (req, res) => {
        var state = new state_model();
        state.name = req.body.name;

        state.save((err) => {
            if (err)
                res.send(err);
            res.json({ message: 'State added successfully' });
        })
    },
    //CITIES
    getAllCities: (req, res) => {
        city_model.find({ is_active: true })
            .populate('state_id', 'name')
            .exec((err, data) => {
                if (err)
                    res.status(400).send(err);
                res.status(200).json(data);
            });
    },
    getCityList: (req, res) => {
        city_model.find({ state_id: req.params.state_id, is_active: true })
            .populate('state_id', 'name')
            .exec((err, result) => {
                if (err)
                    res.status(400).send(err);
                res.status(200).json(result);
            });
    },
    addCity: async (req, res) => {
        try {
            var city = new city_model(req.body);
            const result = await city.save();
            console.log({ result });
            if (result) res.status(200).json({ message: 'City added successfully' });
            else throw new Error('Something Went Wrong');
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    removeCity: (req, res) => {
        city_model.remove({ _id: req.params.cityId }, (err, result) => {
            if (err)
                res.status(400).send(err);
            res.status(200).json({ message: 'City removed successfully', data: result });
        })
    },
    //checkemailAvailability
    checkemailAvailability: (req, res) => {
        // res.send(req.params.email);
        var email = req.params.email;

        users.find({ email: email }, (err, result) => {
            if (err)
                res.status(400).send(err);
            else if (result.length > 0)
                res.status(200).json({ response: true });
            else
                res.status(200).json({ response: false });
        });

    },
    userList: (req, res) => {
        console.log(req,"req");
        users.find().exec((err, result) => {
            if (err) {
                console.error("Error:", err);
                res.status(400).send(err);
            } else {
                // console.log("Result:", result);
                res.status(200).json(result);
            }
        });
    },
    // Add User
    addUser: async (req, res) => {
    try{
        var userData = new users(req.body);            
        const result = await userData.save();
        console.log({result});
        if(result) res.status(200).json({ message: 'User added successfully' });
        else throw new Error('Something Went Wrong');
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
},
getUserById: async (req, res) => {
    try {
        const userId = req.params.id;  // Get user ID from the request URL
        const user = await users.findById(userId);  // Find user by ID
        
        if (user) {
            res.status(200).json(user);
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
},
    getMenu1List: (req, res) => {

        const filters = req.body; // Receive filters from the request body
        let query = {};

        if (filters.searchText) {
            const searchRegex = new RegExp(filters.searchText, 'i'); // Case-insensitive search
            query['$or'] = [
                { name: searchRegex },
                { title: searchRegex },
                { icon: searchRegex },
                { path: searchRegex }
            ];
        }
        menu1_model.find(query, { name: 1, title: 1, icon: 1, path: 1 })  
            .exec((err, data) => {
                if (err) {
                    return res.status(400).send(err);
                }
                return res.status(200).send(data); 
            });
    },
    
    addMenu: async (req, res) => {
        try {
            const menu = new menu1_model({
                name: req.body.name,
                title: req.body.title,
                icon: req.body.icon,
                path: req.body.path
            });

            const result = await menu.save();
            console.log({ result });

            if (result) {
                res.status(200).json({ message: 'Menu added successfully' });
            } else {
                throw new Error('Something went wrong');
            }
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Update an existing menu
    updateMenu: async (req, res) => {
        try {
            const menuId = req.params.id;
            const menu = await menu1_model.findById(menuId);
            if (!menu) {
                throw new Error('Menu not found');
            }
            menu.name = req.body.name;
            menu.title = req.body.title;
            menu.icon = req.body.icon;
            menu.path = req.body.path;
            const result = await menu.save();
            res.status(200).json({ message: 'Menu updated successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Delete a menu
    deleteMenu: (req, res) => {
        const menuId = req.params.menuId || req.body.menuId;

        if (!mongoose.Types.ObjectId.isValid(menuId)) {
            return res.status(400).send({ message: 'Invalid menu ID format' });
        }

        menu1_model.deleteOne({ _id: mongoose.Types.ObjectId(menuId) }, (err, result) => {
            if (err) {
                return res.status(400).send({ message: 'Error deleting menu', error: err.message });
            }

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Menu not found' });
            }

            res.status(200).json({ message: 'Menu removed successfully', data: result });
        });
    },

    // Get a menu by ID
    getMenuById: async (req, res) => {
        try {
            const menuId = req.params.id;
            const menu = await menu1_model.findById(menuId);
            if (!menu) {
                throw new Error('Menu not found');
            }
            res.status(200).json(menu);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getRoleList: (req, res) => {
        const filters = req.body; // Receive filters from the request body
        let query = {};

        if (filters.searchText) {
            const searchRegex = new RegExp(filters.searchText, 'i'); // Case-insensitive search
            query['$or'] = [
                { name: searchRegex },
            ];
        }
        role_model.find(query, { name: 1 })  // Empty filter object to retrieve all, projection for name only
            .exec((err, data) => {
                if (err) {
                    return res.status(400).send(err);
                }
                return res.status(200).send(data);  // Return the data on success
            });
    },
    addRole: async (req, res) => {
        try {
            // Create a new instance of the role model with the data from the request body
            const role = new role_model({
                name: req.body.name
            });

            // Save the new role to the database
            const result = await role.save();
            console.log({ result });

            // If the result exists, send a success response
            if (result) {
                res.status(200).json({ message: 'Role added successfully' });
            } else {
                throw new Error('Something went wrong');
            }
        } catch (err) {
            // Catch any errors and send an error response
            res.status(400).json({ message: err.message });
        }
    },  


    deleteRole: (req, res) => {
        const roleId = req.params.roleId || req.body.roleId;  // Get roleId from URL params or request body

        // Check if the roleId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(roleId)) {
            return res.status(400).send({ message: 'Invalid role ID format' });
        }

        const objectId = mongoose.Types.ObjectId(roleId);

        // Attempt to delete the role
        role_model.deleteOne({ _id: objectId }, (err, result) => {
            if (err) {
                return res.status(400).send({ message: 'Error deleting role', error: err.message });
            }

            // If no document was deleted, return 404 (Not Found)
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Role not found' });
            }

            // Role successfully deleted
            res.status(200).json({ message: 'Role removed successfully', data: result });
        });
    },

     async getRoleById(req, res) {
        try {
            const roleId = req.params.id;
            console.log(roleId,"roleId");
            const role = await role_model.findById(roleId);
            if (!role) {
                throw new Error('Role not found');
            }
            res.status(200).json(role);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    async updateRole(req, res) {
        try {
            const roleId = req.params.id;
            const role = await role_model.findById(roleId);
            if (!role) {
                throw new Error('Role not found');
            }
            role.name = req.body.name;
            const result = await role.save();
            res.status(200).json({ message: 'Role updated successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    deleteUser: (req, res) => {
        const userId = req.params.userId || req.body.userId;  // Get roleId from URL params or request body

        // Check if the roleId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: 'Invalid User ID format' });
        }

        const objectId = mongoose.Types.ObjectId(userId);

        // Attempt to delete the role
        users.deleteOne({ _id: objectId }, (err, result) => {
            if (err) {
                return res.status(400).send({ message: 'Error deleting User', error: err.message });
            }

            // If no document was deleted, return 404 (Not Found)
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Role successfully deleted
            res.status(200).json({ message: 'User removed successfully', data: result });
        });
    },
    async updateUser(req, res) {
        try {
            const userId = req.params.userId;
            const user = await users.findById(userId);
            if (!user) {
                throw new Error('user not found');
            }
            user.name = req.body.name;
            const result = await user.save();
            res.status(200).json({ message: 'user updated successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    async getUserById(req, res) {
        try {
            const userId = req.params.userId;
            console.log(userId,"userId");
            const user = await users.findById(userId);
            if (!user) {
                throw new Error('user not found');
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    async getPermissionList(req, res) {
        try {
          const permissions = await permission_model.find().exec();
          res.status(200).json(permissions);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error fetching permission list' });
        }
      },
      async postPermission(req, res) {
        try {
          const permissions = req.body.map((permission) => {
            return new permission_model(permission);
          });
          const results = await permission_model.insertMany(permissions);
          res.status(201).json({ message: 'Permissions created successfully', permissions: results });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error creating permissions' });
        }
      },
      async deletePermission(req, res) {
        try {
            const deleteData = req.body;
            const promises = deleteData.map(async (data) => {
              const existingPermission = await permission_model.findOne({ menuId: data.menuId, roleId: data.roleId });
              if (existingPermission) {
                await permission_model.deleteOne({ _id: existingPermission._id });
              }
            });
            await Promise.all(promises);
            res.status(200).send({ message: 'Permissions deleted successfully' });
          } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error deleting permissions' });
          }
        },
        async getMenuListByPermission(req, res) {
            try {
              // Retrieve the role name from the request
              const roleName = req.params.role;
                console.log(req.body,"req");
              // Find the role ID from the role name
              const roleId = await role_model.findOne({ name: roleName });
                console.log(roleName,"roleid");
              if (!roleId) {
                throw new Error('Role not found');
              }
          
              // Find the menu IDs from the permission table
              const menuIds = await permission_model.find({ roleId: roleId._id }, { menuId: 1 });
          
              // Find the menu list from the menu table
              const menuList = await menu1_model.find({ _id: { $in: menuIds.map(menuId => menuId.menuId) } });
          
              res.status(200).json(menuList);
            } catch (err) {
              res.status(400).json({ message: err.message });
            }
          }
}