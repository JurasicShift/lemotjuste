const express = require("express");
const app = express();
const router = express.Router();

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const {
  validateFetch,
  pwNums,
  pwConfirm,
  existingClient,
} = require("../middleware");

const { loginJoi, createAcJoi } = require("../joischemas.js");

const Public = require("../controllers/public");

router.get("/home", validateFetch, Public.home);

router.get("/createAccount", Public.createAccount);

router.post(
  "/createAccount",
  pwNums,
  pwConfirm,
  existingClient,
  createAcJoi,
  Public.postCreateAccount
);

router.get("/login", Public.login);

router.post("/login", pwNums, loginJoi, Public.postLogin);

router.get("/about", Public.about);

router.get("/contact", Public.contact);

router.post("/contact", Public.postContact);

router.get("/terms", Public.terms);

module.exports = router;
