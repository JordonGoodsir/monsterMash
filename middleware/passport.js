const passport = require("passport") 
const LocalStrategy = require("passport-local")
const User = require("../models/user_model")

passport.serializeUser((user,done) =>{ 
  done(null, user._id)
}) 

passport.deserializeUser((userId,done) =>{ 
    User.findById(userId) 
    .then(user => done(null,user)) 
    .catch(done)
})

const canLogin = (user,password) =>{  
    if (user){  
    return user.verifyPassword(password) 
    } else { 
        return false
    }
} 

verifyCallback = (email, password,done) => { 
 
    User.findOne({email}) 
    .then((user)=>{ 
        if(canLogin(user,password)) { 
         return done(null, user)
        } else {  
            return done(null, false)
        }
    }) 
    .catch(done)
} 

const altFields = { 
    usernameField: "email"
} 

passport.use(new LocalStrategy(altFields, verifyCallback))