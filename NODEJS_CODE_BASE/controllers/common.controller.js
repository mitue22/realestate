const mongoose = require('mongoose');
var state_model = require('../models/state');
var city_model = require('../models/city');
var menu1_model = require('../models/menu')
var users = require('../models/users');
const role_model = require('../models/role');
var propertyTypeOriginal_model = require('../models/propertyTypeOriginal');
var property_model = require('../models/property');
module.exports = {
    propertyList: (req, res) => {
        property_model.find().exec((err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send(data);
            }
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
}

,
    getMenu1List: (req, res) => {
        menu1_model.find({}, { name: 1, title: 1, icon: 1, path: 1 })  // Projection to retrieve specific columns
            .exec((err, data) => {
                if (err) {
                    return res.status(400).send(err);
                }
                return res.status(200).send(data);  // Return data on success
            });
    },

    addMenu: async (req, res) => {
        try {
            // Create a new instance of the menu1 model with the data from the request body
            const menu = new menu1_model({
                name: req.body.name,
                title: req.body.title,
                icon: req.body.icon,
                path: req.body.path
            });

            // Save the new menu to the database
            const result = await menu.save();
            console.log({ result });

            // If the result exists, send a success response
            if (result) {
                res.status(200).json({ message: 'Menu added successfully' });
            } else {
                throw new Error('Something went wrong');
            }
        } catch (err) {
            // Catch any errors and send an error response
            res.status(400).json({ message: err.message });
        }
    },

    deleteMenu: (req, res) => {
        const menuId = req.params.menuId || req.body.menuId;

        if (!mongoose.Types.ObjectId.isValid(menuId)) {
            return res.status(400).send({ message: 'Invalid menu ID format' });
        }

        const objectId = mongoose.Types.ObjectId(menuId);

        menu1_model.deleteOne({ _id: objectId }, (err, result) => {
            if (err) {
                return res.status(400).send({ message: 'Error deleting menu', error: err.message });
            }

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Menu not found' });
            }

            res.status(200).json({ message: 'Menu removed successfully', data: result });
        });
    },
    getRoleList: (req, res) => {
        role_model.find({}, { name: 1 })  // Empty filter object to retrieve all, projection for name only
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
} 