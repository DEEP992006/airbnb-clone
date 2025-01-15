const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");

const MONGO_URL = "mongodb+srv://biptisurati:deep09@deep.xycm9.mongodb.net/?retryWrites=true&w=majority&appName=deep";
// MAIN FUNCTION TO CONNECT DB



main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
    console.log("error in connecting to DB");

  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
//MIDDLE WARES
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//ROUTES
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//New Route to show the form to add the data
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Show individual listing
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});
// new route post request to add the data
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();


  res.redirect("/listings");
});
//update Route get request to get the data and redirect to edit page
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
} );
//Update Route put request to update the data
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params; 
  const newlist = req.body.listing;
  const list = await Listing.findByIdAndUpdate(id,newlist, {new: true});
 
  res.redirect(`/listings/${id}`);
}
);
app.delete("/listings/:id/delete", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}
);

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
