const express = require("express");
const app = express();
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const path = require("path");
const User = require("./models/User");
const keys = require("./config/keys");

let port = process.env.PORT || 4600;
mongoose
  .connect(keys.db, { useNewUrlParser: true })
  .then(() => console.log("connection succesful"))
  .catch(err => console.error(err));
mongoose.Promise = global.Promise;
app.get("/users", (req, res) => {
  User.find((err, result) => {
    if (err) throw error;
    res.render("allUsers", {
      users: result
    });
  });

  //      another way to show Data
  //   const query = User.find()
  //     /*to sort data*/
  //     .sort({ username: -1 });
  //   // query.limit(4);
  //   query.exec((err, result) => {
  //     if (err) throw error;
  //     res.render("myUsers", {
  //       users: result
  //     });
  //   });
});
app.get("/delete/:id", (req, res) => {
  let userId = req.params.id;
  let query = User.findByIdAndRemove({ _id: userId });
  query.exec(err => {
    if (err) throw err;
    res.redirect("/users");
  });
});
app.get("/update/:id", (req, res) => {
  let userId = req.params.id;
  let query = User.findById({ _id: userId });
  query.exec((err, result) => {
    if (err) throw err;
    res.render("updateUser", {
      user: result
    });
  });
});
app.post("/update/:id", (req, res) => {
  let userId = req.params.id;
  let query = User.findByIdAndUpdate(userId, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    country: req.body.country,
    email: req.body.email,
    password: req.body.password
  });
  query.exec(err => {
    if (err) throw err;
    res.redirect("/users");
  });
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", indexRouter);
app.use("/user", userRouter);

app.set("view engine", "hbs");
app.set(express.static(__dirname + "views"));

app.use(express.static(path.join(__dirname, "public")));
let server = app.listen(port, () => {
  console.log(`app running on port : ${port}`);
});
