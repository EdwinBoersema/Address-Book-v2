const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require("request");

mongoose.connect("mongodb://localhost:27017/AddressBookv2", {
   useNewUrlParser: true,
   useUnifiedTopology: true 
}).then(
    () => {
      console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

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

// // log all contacts
// Contact.find({}, (err, contacts) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(contacts);
//     }
// });

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
    // get the input from the "/new" form and create a new entry in the database

    // redirect to "/"
});

app.post("/random", (req, res) => {

});

app.listen(3000, () => console.log("AddressBook server started"));


// Contact.create({
//     name: "Hubert Gonzales",
//     cell: "06378542745",
//     email: "HubertGonzalez@outlook.com",
//     street: "1639 Pickens Way",
//     postcode: "75090",
//     city: "Sherman"
// }, (err, contacts) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(contacts);
//     }
// });