
story = (req,res) => { 
    res.render("story", {user: req.user.char.limbs, helpers: { ifEquals:function(arg1, arg2, options) {return (arg1 == arg2) ? options.fn(this) : options.inverse(this)}}}) 
}  


module.exports ={ 
    story
}