const Quote = require("./models/indexquotes");
const Member = require("./models/member");

const AppError = require("./utilities/apperror");
const catchAsync = require("./utilities/catchasync");

const { cloudinary } = require("./cloudinary");
// =================================================
// PUBLIC MIDDLEWARE 
// =================================================

const randomFactor = function() {
    Quote.estimatedDocumentCount().exec(function (err, count) {
      let random = Math.floor(Math.random() * count);
      Quote.findOne()
        .skip(random)
        .exec(function (err, result) {
          quoteObj = result;
          return;
        });
    });
  }

  module.exports = {
      randomFactor: randomFactor
  }
  
  module.exports.validateFetch = catchAsync(async (req, res, next) => {
    if (req.headers["call-type"]) {
      randomFactor();
      res.json(quoteObj);
    } else {
      next();
    }
  });
  
  module.exports.pwNums = (req, res, next) => {
    const b = req.body;
    if(b.password.length < 8) {
      req.flash("error", "Password must contain at least 8 characters!!");
      res.redirect(`/lmj${req.url}`);
    } else {
      next();
    }
  }
  
  module.exports.pwConfirm = (req, res, next) => {
    const b = req.body;
    if (b.password === b.conPassword) {
      next();
    } else {
        req.flash("error", "Passwords must match!!");
        res.redirect(`/lmj${req.url}`);
    }
  };
  
  module.exports.existingClient = catchAsync(async (req, res, next) => {
    const b = req.body;
    const use = await Member.exists({ username: b.username });
    const mail = await Member.exists({ email: b.email });
    if (use || mail) {
      throw new AppError("USERNAME OR EMAIL ALREADY EXISTS", 401);
    } else {
      next();
    }
  });

// =================================================
// PRIVATE MIDDLEWARE 
// =================================================

module.exports.requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
      return res.redirect("/lmj/login");
    }
    next();
  };

module.exports.dataCheck = catchAsync(async(req, res, next) => {
    const userId = req.session.user_id;
    const memberObj = await Member.findById(userId);
    if(memberObj.image.url && memberObj.image.filename) {
      cloudinary.uploader.destroy(memberObj.image.filename);
    }  
    next();
  });

// ========================================================
// INPUT TRIM MIDDLEWARE 
// ========================================================

module.exports.postTrimmer = (req, res, next) => {
  if (req.method === 'POST') {
      for (const [key, value] of Object.entries(req.body)) {
          if (typeof(value) === 'string')
              req.body[key] = value.trim();
      }
  }
  next();
}