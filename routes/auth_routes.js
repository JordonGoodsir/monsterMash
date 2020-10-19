const express = require('express');
const router = express.Router();  
const {login,loginCreate,register,registerCreate,logout} = require("../controllers/auth_controller")
const {loginRedirect} = require("../middleware/auth_middleware")

// renders login page, if login redirect passes
router.get("/login", loginRedirect, login)  

// logs in user
router.post("/login", loginCreate) 

// renders register page (sign up)
router.get("/register", loginRedirect ,register)  

// creates User in database
router.post("/register", registerCreate) 

// destorys session
router.get("/logout", logout) 


module.exports = router; 
