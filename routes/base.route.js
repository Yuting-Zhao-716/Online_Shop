const express = require('express');
const router = express.Router();
const baseController = require('../controllers/base.controller');

router.get('/', baseController.getIndexPage);



module.exports=router;

