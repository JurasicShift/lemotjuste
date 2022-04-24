const {randomFactor} = require("../middleware");
const Member = require("../models/member");
const AppError = require("../utilities/apperror");
const { sendMail } = require("../mail.js");
const catchAsync = require("../utilities/catchasync");

let private = false;

let quoteObj = {
    quote: "Le mot juste",
    author: "Gustave Flaubert",
  };

const home = (req, res) => {
    randomFactor();
    req.session.private = private;
    let titleObj = "Home";
    res.render("home", { quoteObj, titleObj, private });
  };

const createAccount = (req, res) => {
    let titleObj = "Create Account";
    res.render("createaccount", { titleObj, private });
  }

const postCreateAccount = catchAsync(async (req, res) => {
    const b = req.body;
    const name = b.username;
    let mode = b.mode;
    mode = mode || "false";
    const member = new Member(b);
    await member.save();
    req.session.user_id = member._id;
    req.session.titleObj = name;
    req.session.mode = mode;
    req.flash("success", `Greetings ${name}!!!`);
    if (mode === "true") {
      res.redirect("/lmj/member/home/academic");
    } else {
      res.redirect("/lmj/member/home/lay");
    }
  });

const login = (req, res) => {
    let titleObj = "Login";
    res.render("login", { titleObj, private});
  }

const postLogin = catchAsync(async (req, res) => {
    const { username, password, cookieChecker = 0} = req.body;
    if(cookieChecker === "on") {
      res.cookie("input1", username);
    }
    const foundUser = await Member.findAndValidate(username, password);
    if (foundUser) {
      req.session.user_id = foundUser._id;
      let mode = foundUser.mode;
      mode = mode || "false";
      let profileUrl = foundUser.image.url || 0;
      req.session.titleObj = foundUser.username;;
      req.session.mode = mode;
      req.session.profileUrl = profileUrl;
      req.flash("success", `Greetings ${username}!!!`);
      if (mode === "true") {
        res.redirect("/lmj/member/home/academic");
      } else {
        res.redirect("/lmj/member/home/lay");
      }
    } else {
      throw new AppError("PASSWORDS OR USERNAME DON'T MATCH", 401);
    }
    
  });

const about = (req, res) => {
    let titleObj = "About";
    res.render("about", { titleObj, private});
  }

const contact = (req, res) => {
    let titleObj = "Contact";
    res.render("contact", { titleObj, private});
  }



const postContact = (req, res) => {
  const {email, subject, text} = req.body;
  const titleObj = "Home";
  sendMail(email, subject, text, function(err, data) {
    if(data) {
      const flasher = req.flash("success", "KAPOW! Message Sent!!!");
      if(flasher === 1) {
        res.redirect("/lmj/");
      }
    } else {
      throw new AppError("MESSAGE FAILED. CONTACT US DIRECT ON LEMOTJUSTECHAT@OUTLOOK.COM", 502);
    }
  })
};

const terms = (req, res) => {
    let titleObj = "Terms and Conditions";
    res.render("terms", { titleObj, private });
  }

  module.exports = {
    terms,
    postContact,
    contact,
    about,
    postLogin,
    login,
    postCreateAccount,
    createAccount,
    home

  }