// requires
const express = require('express');
const mongoose = require('mongoose');  
var exphbs  = require('express-handlebars');
const indexRouter =  require(`./routes/index_routes`);   
const authRouter =  require(`./routes/auth_routes`);   
const pagesRouter =  require(`./routes/pages_routes`);  
const session = require("express-session") 
const MongoStore = require('connect-mongo')(session); 
const passport = require("passport") 

// configure local strategy for passport 
require("./middleware/passport")


// set up 
const port = process.env.port || 3000;
const app = express();      

require('dotenv').config()
 
app.use(express.json()); 

app.use(express.urlencoded({ 
    extended: true
})); 

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');   

const atlasUri = process.env.MONGO_URI 

// connects to mongodb and gets rid of warnings

/*
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
*/

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

app.get("/", (req, res) => {
	res.render("home", {layout : "main"})
})

app.get("/creation", (req, res) => {
    res.render("creation", {layout : "main"})
    // console.log(req.params);
    // let url = new URL(window.location.href)
    // console.log(url.searchParams.get("head"));
    // https.get(url, (res) => {
    //     console.log(res)
    // })
})

app.get("/create/:head/:torso/:right_arm/:left_arm/:right_leg/:left_leg", (req, res) => {
    res.render("/create/")
})

// res.sendFile(__dirname + '/docs/Vampire.png')

app.use("/",express.static("public"));

app.post("/postJson", (req, res) => {
    // res.sendStatus(200);
    // res.redirect(307, "/monster");
    // res.status(204).send();
})

app.post("/creation", (req, res) => {
    console.log(req.body.head);
    console.log(req.body.torso);
    console.log(req.body.right_arm);
    console.log(req.body.left_arm);
    console.log(req.body.right_leg);
    console.log(req.body.left_leg);
    // res.sendFile(path.join(__dirname + "/public/Images/" + "Vampire.png"));
    res.send({head: req.body.head, torso: req.body.torso, right_arm: req.body.right_arm, left_arm: req.body.left_arm, right_leg: req.body.right_leg, left_leg: req.body.left_leg});
    // res.status(204).send();
})

app.use(express.static("views"));


app.use('/index', indexRouter); 
app.use('/user', authRouter);
app.use('/', pagesRouter);


// confirm server working
app.listen(port, () => {
    console.log(`Blog express app listening on port ${port}`);
}); 