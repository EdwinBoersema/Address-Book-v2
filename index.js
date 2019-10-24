// require dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// start the server at port 3000
app.listen(3000, () => console.log("AddressBook server started on port 3000"));

const request = require("request");
const mongo = require("./mongo");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// DEFAULT ROUTE
app.get("/", (req, res) => {
    res.render("landing");
});

// app.get("/", (req, res) => {
//     mongo.find({}, (err, allContacts) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("landing", { contacts: allContacts });
//         }
//     });
// });

// INDEX ROUTE
app.get("/index", (req, res) => {
    mongo.find({}, (err, allContacts) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("index", { contacts: allContacts});
        }
    });
});
// SEARCH ROUTE


// SHOW ROUTE
app.get("/index/show/:id", (req, res) => {
    mongo.findById(req.params.id, (err, foundContact) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            console.log(foundContact.name);
            res.render("show", { contact: foundContact });
        }
    })
});

// EDIT ROUTE
app.get("/index/show/:id/edit", (req, res) => {
    mongo.findById(req.params.id, (err, foundContact) => {
        if (err) {
            console.log(err); 
            res.redirect("/");
        } else {
            res.render("edit", { contact: foundContact});
        }
    });
});

// UPDATE ROUTE
app.put("/index/show/:id/", (req, res) => {
    mongo.findByIdAndUpdate(req.params.id, req.body.contact, (err, updatedContact) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.redirect("/index/show/" + req.params.id);
            console.log(req.body.contact);
        }
    });
})

// DELETE ROUTE
app.delete("/index/show/:id", (req, res) => {
    // destroy blog
    mongo.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.redirect("/index");
        }
    });
    // redirect to "/"
});

// Render new.ejs on "/new"
app.get("/new", (req, res) => {
    res.render("new");
});

// Create Contact Post
app.post("/new", (req, res) => {
    // get the input from the "/new" form and create a new entry in the database
    let name = req.body.name;
    let cell = req.body.cell;
    let email = req.body.email;
    let street = req.body.street;
    let postcode = req.body.postcode;
    let city = req.body.city;
    let newContact = {
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
            res.redirect("/index");
        }
    });
});

//get random contact(s) added to the database
app.get("/random", (req, res) => {
    res.render("random");
})

app.post("/random", (req, res) => {
    // Call the API for 10 random Contacts
    request('https://randomuser.me/api/?results=10&inc=name,location,email,phone', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const parsedData = JSON.parse(body);
            // Loop through the contacts and assign the data to the corresponding variables
            for (let i = 0; i < 10; i++) {
                let data = parsedData.results[i];
                let randomName = data.name.first + " " + data.name.last;
                let randomCell = data.phone;
                let randomEmail = data.email;
                let randomStreet = data.location.street.number + " " + data.location.street.name;
                let randomPostcode = data.location.postcode;
                let randomCity = data.location.city;
                // Put the variables into 1 array
                let randomContact = {
                    name: randomName,
                    cell: randomCell,
                    email: randomEmail,
                    street: randomStreet,
                    postcode: randomPostcode,
                    city: randomCity
                };
                // Create a new database entry with the array
                mongo.create(randomContact, (err, newlyCreated) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(randomContact);
                    }
                });
            }
        } else if (error) {
            console.log(error);
        }
    });
    // redirect to "/random" after creating the new entries
    res.redirect("/random");
});
