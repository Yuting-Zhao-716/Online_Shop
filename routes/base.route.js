const express = require('express');
const router = express.Router();
const baseController = require('../controllers/base.controller');

router.get('/', baseController.getIndexPage);

router.get('/401',function (req,res){
    res.render('./baseViews/401');});

router.get('/403',function (req,res){
    res.render('./baseViews/403');});

module.exports=router;

