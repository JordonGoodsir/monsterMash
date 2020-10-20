const express = require('express');
const router = express.Router();    
const {customMonster} = require("../controllers/creation_controller")
const {authorize} = require("../middleware/auth_middleware")




router.use("/",customMonster)


module.exports = router; 

"hi"