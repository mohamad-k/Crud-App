const express = require("express");
const router = express.Router();
const User = require("../models/User");
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  let formData = req.body;
  // res.json(formData);
  //   console.log(formData);
  let newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    country: req.body.country,
    email: req.body.email,
    password: req.body.password,
    created_at: Date.now()
  });
  //save newUser in database
  newUser.save(err => {
    if (err) throw err;
    res.render("register", {
      userData: req.body
    });
  });
});

module.exports = router;
