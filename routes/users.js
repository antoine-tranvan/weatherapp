// var express = require("express");
// var router = express.Router();
// var request = require("sync-request");

// var userModel = require("../models/users");

// var emailAlreadyExist;
// var userAlreadyExist;
// var wrongPassword;


// // router.post("/sign-up", async function (req, res, next) {
// //   var emailAlreadyExist = true;

// //   var findUser = await userModel.findOne({ email: req.body.email });

// //   if (findUser == null) {
// //     emailAlreadyExist = false;
// //     var newUser = new userModel({
// //       username: req.body.username,
// //       email: req.body.email,
// //       password: req.body.password,
// //     });
// //     await newUser.save();

// //     req.session.userId = newUser.id;
// //     req.session.username = newUser.username;
// //     res.redirect("/weather");
// //   } else {
// //     res.render("login", {
// //       emailAlreadyExist: emailAlreadyExist,
// //       userAlreadyExist: userAlreadyExist,
// //       wrongPassword: wrongPassword,
// //     });
// //   }
// // });

// // router.post("/sign-in", async function (req, res, next) {
// //   var userAlreadyExist = true;
// //   wrongPassword = false;

// //   var findUser = await userModel.findOne({ email: req.body.email });

// //   if (findUser == null) {
// //     userAlreadyExist = false;
// //     res.render("login", {
// //       userAlreadyExist: userAlreadyExist,
// //       emailAlreadyExist: emailAlreadyExist,
// //       wrongPassword: wrongPassword,
// //     });
// //   } else if (findUser.password === req.body.password) {
// //     req.session.userId = findUser.id;
// //     req.session.username = findUser.username;
// //     res.redirect("/weather");
// //   } else {
// //     wrongPassword = true;
// //     res.render("login", {
// //       userAlreadyExist: userAlreadyExist,
// //       emailAlreadyExist: emailAlreadyExist,
// //       wrongPassword: wrongPassword,
// //     });
// //   }
// // });

// // router.get("/logout", async function (req, res, next) {
// //   req.session.userId = "";
// //   req.session.username = "";
// //   res.redirect("/");
// // });

// module.exports = router;
