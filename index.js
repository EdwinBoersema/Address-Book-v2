const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.listen(3000, () => console.log("AddressBook server started"));

const request = require("request");
const mongo = require("./mongo");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Default Route
app.get("/", (req, res) => {
    mongo.find({}, (err, allContacts) => {
        if (err) {
            console.log(err);
        } else {
            res.render("landing", { contacts: allContacts });
        }
    });
});

// Render new.ejs on "/new"
app.get("/new", (req, res) => {
    res.render("new");
});

// Create Contact Post
app.post("/new", (req, res) => {
    // get the input from the "/new" form and create a new entry in the database
    const name = req.body.name;
    const cell = req.body.cell;
    const email = req.body.email;
    const street = req.body.street;
    const postcode = req.body.postcode;
    const city = req.body.city;
    const newContact = {
        name: name,
        cell: cell,
        email: email,
        street: street,
        postcode: postcode,
        city: city
    };
    // Create new database entry
    mongo.create(newContact, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            // redirect to "/"
            res.redirect("/");
        }
    });
});

//get random contact(s) added to the database
app.get("/random", (req, res) => {
    res.render("random");
})

app.post("/random", (req, res) => {
    const count = req.body.count;
    request('https://randomuser.me/api/?results=1?inc=name,location,email,phone', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const parsedData = JSON.parse(body);
            console.log(parsedData);
        } else if (error) {
            console.log(error);
        }
    });
});

request('https://randomuser.me/api/?results=1?inc=name,location,email,phone', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const parsedData = JSON.parse(body);
            console.log(parsedData);
        } else if (error) {
            console.log(error);
        }
    });