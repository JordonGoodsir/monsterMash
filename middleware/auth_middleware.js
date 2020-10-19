const loginRedirect = (req,res,next) =>{       
    if(req.user){ 
        return res.redirect("/")
    } else { 
        return next()
    }
};  

const authorize = (req,res,next) =>{   
    console.log("===========req.user=============")
    console.log(req.user) 
    console.log("===========req.session=============")
    console.log(req.session) 
    if(req.user) { 
        return next()
    } else { 
        return res.redirect("/user/login")
    }

}


module.exports ={  
    loginRedirect, 
    authorize

}