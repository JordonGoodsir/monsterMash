const User = require("../models/user_model") 

const loginRedirect = (req,res,next) =>{       
    if(req.user){ 
        return res.redirect("/") 
    } else { 
        return next()
    }
};     


inUse = (req,res,next) => {  
    User.findOne({email: req.body.email}) 
    .then(user => { 
        if (user) {  
            res.render("user/register", {error: "Email already in use"})
        } else ( 
            next()
        )
    }) 
    .catch(next)
  }    

  invalidPass = (req,res,next) => {   
    User.findOne({password: req.body.password}) 
    .then(user => { 
        if (user) {  
            next()
        } else (  
            res.render("user/login", {error: "Invalid email or password"})
        )
    }) 
    .catch(next)
  }    

  invalidEmail = (req,res,next) => {   
    User.findOne({email: req.body.email}) 
    .then(user => { 
        if (user) {  
            next()
        } else ( 
            res.render("user/login", {error: "Invalid email or password"})
        )
    }) 
    .catch(next)
  }   

  detailsCheck = (req,res,next) =>{  
       User.findOne({email:req.body.email}) 
       .then((user) => {  
    //    if(user.verifyPassword(user.password)){ 
    //      next() 
    //    }else { 
    //     res.render("user/login", {error: "Invalid email or password"})
    //    } 
    next()
       }) 
       .catch(next)
  }  
    

const authorize = (req,res,next) =>{   
    if(req.user) { 
        return next()
    } else { 
        return res.redirect("/user/login")
    }
}   

module.exports ={  
    loginRedirect, 
    authorize, 
    inUse, 
    invalidEmail, 
    detailsCheck
} 

