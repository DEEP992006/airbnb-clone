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

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
