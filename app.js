// requires
const express = require('express');
const mongoose = require('mongoose');  
var exphbs  = require('express-handlebars');
const indexRouter =  require(`./routes/index_routes`);   
const authRouter =  require(`./routes/auth_routes`);   
const pagesRouter =  require(`./routes/pages_routes`);  
const creationRouter = require("./routes/creation_routes")  
const storyRouter =  require("./routes/story_routes")
const session = require("express-session") 
const MongoStore = require('connect-mongo')(session); 
const passport = require("passport")  
var exphbs = require('express-handlebars') 


// configure local strategy for passport 
require("./middleware/passport")


// set up 
const port = process.env.PORT || 3000;
const app = express();      

require('dotenv').config()
 
app.use(express.json()); 

app.use(express.urlencoded({ 
    extended: true
}));   

const hbs = exphbs.create({ 
    helpers: { 
        ifEquals:function(arg1, arg2, options) {return (arg1 == arg2) ? options.fn(this) : options.inverse(this)}
    }
});

// hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
//     return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
// }); 

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');   

const atlasUri = process.env.MONGO_URI

// connects to mongodb and gets rid of warnings


mongoose.connect(atlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},
(err) => {
    if (err) {
        console.log('Error connecting to database', err);
    } else {
        console.log('Connected to database!');
    }
});

app.set('trust proxy', 1) // trust first proxy
app.use(session({ 
//   put this in env
  secret: 'spooky',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
})) 


// enables passport with passport file in middleware folder
app.use(passport.initialize()) 
app.use(passport.session())   


app.use("/",express.static("public"));
app.use(express.static("views"));

app.use('/index', indexRouter); 
app.use('/user', authRouter); 
app.use('/creation', creationRouter) 
app.use('/story', storyRouter)
app.use('/', pagesRouter); 


// confirm server working
app.listen(port, () => {
    console.log(`Blog express app listening on port ${port}`);
}); 