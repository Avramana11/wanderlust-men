const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../Schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listeningController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


// const validateListing = (req, res, next) => {
//     let { error } = listingSchema.validate(req.body);
//     console.log(error);
//     if(error){
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     }else{
//         next();
//     }
// }; 


router.route("/")
.get(wrapAsync(listeningController.index))
.post(isLoggedIn,  upload.single('listing[image]'),validateListing, wrapAsync(listeningController.createListing));

//New Route   keep it up
router.get("/new",isLoggedIn,listeningController.renderNewForm);


router.route("/:id")
.get(wrapAsync(listeningController.showListing))
.put(isLoggedIn,isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listeningController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listeningController.destroyListing));


// Index Router
// router.get("/",wrapAsync(listeningController.index));



// Show Route

// router.get("/:id",wrapAsync(listeningController.showListing));

//Create Route
// router.post("/",isLoggedIn, validateListing ,wrapAsync(listeningController.createListing));

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listeningController.renderEditForm));

//Update route
// router.put("/:id",isLoggedIn,isOwner, validateListing, wrapAsync(listeningController.updateListing));

//Delete Route
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listeningController.destroyListing));

module.exports = router;
