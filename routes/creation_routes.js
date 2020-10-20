const express = require('express');
const router = express.Router();
const {monsterData} = require('../controllers/creation_controller');  

router.get("/", (req,res) => res.render("creation"))

router.post("/", monsterData)


module.exports = router 
