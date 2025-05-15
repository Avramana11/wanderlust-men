if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}
// console.log(process.env); // remove this after you've confirmed it is working  

const express = require("express");
const app = express();
const mongoose =  require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path"); // for ejs
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./Schema.js");
const Review = require("./models/review.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');  // production
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingRouter  = require("./routes/listing.js");
const reviewRouter  = require("./routes/review.js");
const userRouter  = require("./routes/user.js");
const { error } = require('console');
// const passport = require("passport"); 

//Create Database
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust" //name of database is wanderlust
const dbUrl = process.env.ATLASDB_URL;
console.log("DB URL:", dbUrl);

main()
  .then(()=>{   //calling main function
    console.log("connected to DB");
   }).catch((err)=>{
    console.log(err);
   });

async function main() {
    await mongoose.connect(dbUrl); 
}

app.set("view engine", "ejs");  // for ejs
app.set("views",path.join(__dirname,"views"));   //for ejs
app.use(express.urlencoded({extended: true})); //for let {id} = req.params;
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));// for static files like style.css


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 3600,
});


store.on("error", ()=>{
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

//Basic setup
// app.get("/",(req,res)=>{
//     res.send("Hi, I am root");
// });



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("/demouser", async(req,res) => {
//     let fakeUser = new User({
//         email : "student@gmail.com",
//         username: "delta-student",
//     });

//     const registeredUser = await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.all("*", (req,res,next) => {
    next(new ExpressError(404, "Page not Found!"));
});
  
// Middleware - Error Handler
app.use((err,req,res,next)=>{
    let {statusCode = 500, message = "Something went wrong!"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, ()=>{
   console.log("Server is listening to port 8080");
});
// //New Route
// app.get("/listings/new",(req,res)=>{
//    res.render("./listings/new.ejs");
// });
// app.get("/testListing",async(req,res)=>{
//    let SampleListing = new Listing({
//     title: "My Home",
//     description: "My THe beach",
//     price: 1200,
//     location : "Canada",
//     coutry: "Canada",
//    });

//    await SampleListing.save();
//    console.log("Sample was saved");
//    res.send("success");
// });

