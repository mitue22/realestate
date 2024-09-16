const express = require('express');
var multer = require('multer');
const crypto = require('crypto');
var path = require('path');
var GridFsStorage = require('multer-gridfs-storage');
const config = require('../config/config');
var app=express();
var router = express.Router();
var propertyController = require('../controllers/property.controller');
var commonController=require('../controllers/common.controller');
// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MLAB_DB_URL || config.localDB,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'imageMeta'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });



// ====================================================================================
// ====================================ROUTES=========================================
// ====================================================================================
// Property type dropdown
// router.get('/type', propertyController.propertyTypeList);
router.post('/type', propertyController.addPropertyType);
router.post('/list',commonController.propertyList);
//Property
 router.post('/new', upload.array("propImages"), propertyController.addNewProperty);
router.get('/list/:userId', propertyController.getUserList);
router.get('/list/', propertyController.getFullList);
router.get('/single/:propertySlug', propertyController.getSingleProperty);
router.get('/showGFSImage/:filename', propertyController.showGFSImage); // To view image in front-end
router.post('/markAsSold/:propertySlug', propertyController.markAsSold);
//Properties filter
router.get('/filter', propertyController.filterProperties);
router.put('/edit/:id',propertyController.editProperty);
router.delete('/deleteProperty/:id', propertyController.deleteProperty);

module.exports = router;