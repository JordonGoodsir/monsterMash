const express = require('express');
const router = express.Router();   
const {authorize} = require("../middleware/auth_middleware")

router.use("/",home = (req,res) => res.render("home", {user: req.user ? true : false}))

module.exports = router; 
