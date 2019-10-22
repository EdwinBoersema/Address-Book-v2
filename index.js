const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/AddressBook", {
   useNewUrlParser: true,
   useUnifiedTopology: true 
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

// MongoDB Schema setup
const contactSchema = new mongoose.Schema({
    name: String,
    cell: String,
    email: String,
    street: String,
    postcode: Number,
    city: String
});

const Contact = mongoose.model("Contact", contactSchema);

//Default Route
app.get("/", (req, res) => {
    Contact.find({}, (err, allContacts) => {
        if (err) {
            console.log(err);
        } else {
            res.render("landing", {contacts: allContacts});
        }
    });
});

// Create Contact Form
app.get("/new", (req, res) => {
    res.render("new");
});

// Create Contact Post
app.post("/new", (req, res) => {

});