const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.listen(3000, () => console.log("AddressBook server started"));

const request = require("request");
const mongo = require("./mongo");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

//Default Route
app.get("/", (req, res) => {
    mongo.find({}, (err, allContacts) => {
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
    // get the input from the "/new" form and create a new entry in the database

    // redirect to "/"
});

//get random contact(s) added to the database

app.get("/random", (req, res) => {
    res.render("random");
})

app.post("/random", (req, res) => {

});

