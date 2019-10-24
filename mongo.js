const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/AddressBookv2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(
    console.log("Connected to database")
);

// MongoDB Schema setup
const contactSchema = new mongoose.Schema({
    name: String,
    cell: String,
    email: String,
    street: String,
    postcode: String,
    city: String
});

// Exporting the model for use in index.js
module.exports = mongoose.model("Contact", contactSchema);


// // log all contacts
// Contact.find({}, (err, contacts) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(contacts);
//     }
// });

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
