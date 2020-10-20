const { monsterStatus } = require("../middleware/auth_middleware")
const User = require("../models/user_model")  


const monsterData = (req,res) =>{  
    console.log(req.user.email)
   
    const {head, body, right_arm, left_arm, right_leg, left_leg} = req.body  
 
    User.findOneAndUpdate({email: req.user.email}, {$set:{char:{limbs:{head:head,body:body,rightArm:right_arm,leftArm:left_arm,rightLeg:right_leg,leftLeg:left_leg}}}}) 
    .then(data => console.log(data)) 

    res.redirect("/")
} 

const customMonster = (req,res) => {  
    if(req.user && req.user.char.limbs.head) { 
        res.render("home",{userStatus: req.user ? true : false, user: req.user.char.limbs, helpers: { ifEquals:function(arg1, arg2, options) {return (arg1 == arg2) ? options.fn(this) : options.inverse(this)}}})
    } else { 
        res.render("home",{userStatus: req.user ? true : false, user:{ head: 'zombo_head', body: 'zombo_body', rightArm: 'zombo_right_arm', leftArm: 'zombo_left_arm', rightLeg: 'zombo_right_leg', leftLeg: 'zombo_left_leg'}, 
        helpers: { ifEquals:function(arg1, arg2, options) {return (arg1 == arg2) ? options.fn(this) : options.inverse(this)}}})
    }
}

module.exports = { 
    monsterData, 
    customMonster
};  