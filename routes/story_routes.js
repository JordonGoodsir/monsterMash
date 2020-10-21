const express = require('express');
const router = express.Router();  
const {authorize} = require("../middleware/auth_middleware") 
const {story} = require("../controllers/story_controller")


router.get("/", authorize,story)

module.exports = router; 