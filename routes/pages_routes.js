const express = require('express');
const router = express.Router();   
const {authorize} = require("../middleware/auth_middleware")

router.use("/",home = (req,res) =>{    
    console.log(req.user ? true : false)
    res.render("home", {user: req.user ? true : false})  
})

module.exports = router; 
