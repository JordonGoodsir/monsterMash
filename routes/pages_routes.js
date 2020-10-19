const express = require('express');
const router = express.Router();   
const {authorize} = require("../middleware/auth_middleware")

router.use("/", authorize, home = (req,res) => res.render("home"))

module.exports = router; 
