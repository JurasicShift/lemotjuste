const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const process = require("process");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

const port = process.env.PORT || 5150;
const environment = process.env.NODE_ENV || 'development';

if (environment !== "production") {
  require("dotenv").config();
}

const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const dbUrl =  process.env.DB_URL || "mongodb://localhost:27017/lemotjuste";

const store = MongoStore.create({mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,})

const secret = process.env.SECRET || "thisisnotagoodsecret";

const sessionOptions = {
  store: store,
  name: "pickwickSession",
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 60 * 24 * 7,
  },
};

const public = require("./routes/public");
const private = require("./routes/private");
const AppError = require("./utilities/apperror");
const {postTrimmer} = require("./middleware");


mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use("/lmj", express.static(__dirname + "/publicCarousel"));
app.use(mongoSanitize());

app.use(session(sessionOptions));
app.use(flash());
app.use(postTrimmer);

const scriptSrcUrls = [

];
const styleSrcUrls = [
  "https://use.fontawesome.com",
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
];


const connectSrcUrls = [
  "https://www.dictionaryapi.com/",
];
const fontSrcUrls = [];

app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'", ...connectSrcUrls],
          scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
          styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
          workerSrc: ["'self'", "blob:"],
          objectSrc: [],
          imgSrc: [
              "'self'",
              "blob:",
              "data:",
              "https://res.cloudinary.com/lemotjuste/",
              "http://www.w3.org/2000/svg",
              "http://www.w3.org/1999/xlink",
              "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"

          ],
      },
  })
);

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.deleteAc = req.flash("deleteAc");
  next();
});

app.use("/", public);
app.use("/member", private);

app.get("/origin", (req, res) => {
    res.redirect(req.session.returnTo);
    delete req.session.returnTo;
})

//404 HANDLER

app.get('*', (req, res) => {
  throw new AppError(`PAGE NOT FOUND`, 404);

})


// ==================================================
// INTERCEPT PARTICULAR MONGOOSE ERRORS
// ==================================================

const handleValidationErr = (err) => {
  throw new AppError(`VALIDATION FAILED...CHECK REQUIRED FIELDS ARE COMPLETE`, 400);
};

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") err = handleValidationErr(err);
  next(err);
});
// =================================================
// =================================================

app.use((err, req, res, next) => {
  if(err.status === 404) {
    req.session.returnTo = "/";
  } else {
    req.session.returnTo = req.url;
  }
  
  const { status = 500 } = err;
  if (!err.message) err.message = "OH NO SOMETHING WENT WRONG";
  const private = req.session.private;
  const titleObj = "Error";
  if (private) {
    const titleObj = `${req.session.titleObj} Error`;
    const profileObj = req.session.titleObj;
    const mode = req.session.mode;
    let profileUrl = req.session.profileUrl || 0;
    res.status(status).render("error", { err, private, titleObj, profileObj, mode, profileUrl });
  } else {
    res.status(status).render("error", { err, private, titleObj });
  }
});

app.listen(port, () => {
  console.log(`APP LISTENING ON ${port}`);
});
