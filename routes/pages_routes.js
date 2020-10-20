const express = require('express');
const router = express.Router();    
const {customMonster} = require("../controllers/creation_controller")
const {authorize, charCheck} = require("../middleware/auth_middleware")




router.use("/",charCheck,customMonster)


module.exports = router; 
