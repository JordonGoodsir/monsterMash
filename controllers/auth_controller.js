const User = require("../models/user_model") 
const passport = require("passport")


const login = (req,res) => { 
    res.render("user/login")
}   

const loginCreate = (req,res,next)=> {    

    const login = passport.authenticate("local",  
    { 
        successRedirect:"/", 
        failureRedirect:"/user/login"
    })
    login(req,res,next)  
} 

const register = (req,res) =>{ 
    res.render("user/register")
}  

const registerCreate = (req,res,next) =>{  
    const newUserHandler = (user) => { 
        // login is passport func
        req.login(user, (err) =>{ 
            if(err){ 
                next(err) 
            } else { 
                res.redirect("/creation")
            } 
        })    
       }  

       const {email, password} = req.body  
    //    console.log(req.body) 

    User.create({email,password})   
    .then(newUserHandler)  
} 

const logout = (req,res) =>{ 
    req.session.destroy(()=> {   
        res.redirect("/")
     }) 
}

// exports to routes
module.exports = { 
    login, 
    loginCreate, 
    register, 
    registerCreate, 
    logout
};