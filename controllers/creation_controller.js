User = require("../models/user_model") 

const monsterData = (req,res) =>{ 
    // console.log("hello jeff")    
    const {head, body, right_arm, left_arm, right_leg, left_leg} = req.body  
    console.log(head);
    console.log(body);
    console.log(right_arm);
    console.log(left_arm);
    console.log(right_leg);
    console.log(left_leg);   

    console.log(User.findOne({email:req.user.email}))
    // console.log(document.getElementById("hi").innerHTML)
    // res.send({head: req.body.head, torso: req.body.torso, right_arm: req.body.right_arm, left_arm: req.body.left_arm, right_leg: req.body.right_leg, left_leg: req.body.left_leg});
}

module.exports = { 
    monsterData 
};