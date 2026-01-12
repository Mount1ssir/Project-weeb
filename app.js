const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
const User = require("./models/CustomerSchema");
const product = require("./models/ProductSchema");
app.set("view engine", "ejs");
app.use(express.static("public"));
var moment = require(`moment`);

app.get("/", (req, res) => {
  Promise.all([User.find(), product.find()])
    .then(([customers, products]) => {
      res.render("index.ejs", {
        arrC: customers,
        arrP: products,
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error fetching data");
    });
});

app.get("/user/add", (req, res) => {
  res.render("user/add.ejs");
});
app.get("/user/edit", (req, res) => {
  res.render("user/edit.ejs");
});
app.get("/user/search", (req, res) => {
  res.render("user/search.ejs");
});
app.get("/product/add", (req, res) => {
  res.render("product/add.ejs");
});
app.get("/user/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view.ejs", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/user/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit.ejs", { item: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/user/add", (req, res) => {
  const newC = new User(req.body);
  newC
    .save()
    .then((result) => {
      res.redirect("/user/add");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/product/add", (req, res) => {
  const newP = new product(req.body);
  newP
    .save()
    .then((result) => {
      res.redirect("/product/add");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.delete("/edit/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then((result) => {
    res.redirect("/");
  });
});
app.delete("/product/:id", (req, res) => {
  product.deleteOne({ _id: req.params.id }).then((result) => {
    res.redirect("/");
  });
});

app.put("/edit/:id", (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error updating user");
    });
});
mongoose
  .connect("mongodb://localhost:27017/MydataBase")
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
