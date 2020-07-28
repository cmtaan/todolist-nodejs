//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-taan:1234@cluster0.sv4kg.mongodb.net/todolistDB", { useNewUrlParser: true });

const itemsSchema = {
    name: String
}

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "[Default] - Welcome! "
});

const defaultItems = [];




app.get("/", function(req, res) {

    Item.find({}, function(err, foundItems) {
        res.render("list", { listTitle: "Today", newListItems: foundItems });

    });
});

app.post("/", function(req, res) {

    const itemName = req.body.newItem;

    if (itemName !== '') {
        const item = new Item({
            name: itemName
        });

        item.save();
    }
    res.redirect("/");
});

app.post("/delete", function(req, res) {

    const checkedItemId = req.body.checkbox;

    Item.findByIdAndRemove(checkedItemId, function(err) {
        console.log("Success deleted checked item!");
        res.redirect("/");
    });
})

app.get("/about", function(req, res) {
    res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, function() {
    console.log("Server is running");
});