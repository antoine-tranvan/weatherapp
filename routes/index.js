var express = require("express");
var router = express.Router();
var request = require("sync-request");

var cityModel = require("../models/cities");
var userModel = require("../models/users");

var emailAlreadyExist;
var userAlreadyExist;
var wrongPassword;

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.username == "") {
    res.render("login", {
      title: "Express",
      emailAlreadyExist: emailAlreadyExist,
      userAlreadyExist: userAlreadyExist,
      wrongPassword: wrongPassword,
    });
  } else {
    res.redirect("/weather");
  }
});

router.get("/weather", async function (req, res, next) {
  var cityList = await cityModel.find();
  console.log(req.session.username);
  if (req.session.username == "") {
    res.redirect("/");
  } else {
    res.render("weather", { cityList, username: req.session.username });
  }
});

router.post("/add-city", async function (req, res, next) {
  var data = request(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&units=metric&lang=fr&appid=0c815b9455235455a301668a56c67b18`
  );
  var dataAPI = JSON.parse(data.body);

  var alreadyExist = await cityModel.findOne({
    name: req.body.newcity.toLowerCase(),
  });

  if (alreadyExist == null && dataAPI.name) {
    var newCity = new cityModel({
      name: req.body.newcity.toLowerCase(),
      desc: dataAPI.weather[0].description,
      img:
        "http://openweathermap.org/img/wn/" + dataAPI.weather[0].icon + ".png",
      temp_min: dataAPI.main.temp_min,
      temp_max: dataAPI.main.temp_max,
    });

    await newCity.save();
  }

  cityList = await cityModel.find();

  res.render("weather", { cityList });
});

router.get("/delete-city", async function (req, res, next) {
  await cityModel.deleteOne({
    _id: req.query.id,
  });

  var cityList = await cityModel.find();

  res.render("weather", { cityList });
});

router.get("/update-cities", async function (req, res, next) {
  var cityList = await cityModel.find();

  for (var i = 0; i < cityList.length; i++) {
    var data = request(
      "GET",
      `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&units=metric&lang=fr&appid=0c815b9455235455a301668a56c67b18`
    );
    var dataAPI = JSON.parse(data.body);

    await cityModel.updateOne(
      {
        _id: cityList[i].id,
      },
      {
        name: cityList[i].name,
        desc: dataAPI.weather[0].description,
        img:
          "http://openweathermap.org/img/wn/" +
          dataAPI.weather[0].icon +
          ".png",
        temp_min: dataAPI.main.temp_min,
        temp_max: dataAPI.main.temp_max,
      }
    );
  }

  var cityList = await cityModel.find();

  res.render("weather", { cityList });
});

router.post("/sign-up", async function (req, res, next) {
  var emailAlreadyExist = true;

  var findUser = await userModel.findOne({ email: req.body.email });

  if (findUser == null) {
    emailAlreadyExist = false;
    var newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();

    req.session.userId = newUser.id;
    req.session.username = newUser.username;
    res.redirect("/weather");
  } else {
    res.render("login", {
      emailAlreadyExist: emailAlreadyExist,
      userAlreadyExist: userAlreadyExist,
      wrongPassword: wrongPassword,
    });
  }
});

router.post("/sign-in", async function (req, res, next) {
  var userAlreadyExist = true;
  wrongPassword = false;

  var findUser = await userModel.findOne({ email: req.body.email });

  if (findUser == null) {
    userAlreadyExist = false;
    res.render("login", {
      userAlreadyExist: userAlreadyExist,
      emailAlreadyExist: emailAlreadyExist,
      wrongPassword: wrongPassword,
    });
  } else if (findUser.password === req.body.password) {
    req.session.userId = findUser.id;
    req.session.username = findUser.username;
    res.redirect("/weather");
  } else {
    wrongPassword = true;
    res.render("login", {
      userAlreadyExist: userAlreadyExist,
      emailAlreadyExist: emailAlreadyExist,
      wrongPassword: wrongPassword,
    });
  }
});

router.get("/logout", async function (req, res, next) {
  req.session.userId = "";
  req.session.username = "";
  res.redirect("/");
});

module.exports = router;
