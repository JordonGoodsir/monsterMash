const express = require('express');
const router = express.Router();
const {monsterData} = require('../controllers/creation_controller');  
const {authorize} = require("../middleware/auth_middleware") 

router.get("/",authorize,(req,res) => res.render("creation", {userStatus: req.user ? true : false}))

router.post("/",monsterData)


module.exports = router 
