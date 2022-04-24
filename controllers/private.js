
const Member = require("../models/member");
const Quote = require("../models/quote");

const catchAsync = require("../utilities/catchasync");
const AppError = require("../utilities/apperror");

const { cloudinary } = require("../cloudinary");

const private = true;

const homeAcademic = (req, res) => {
  req.session.private = private;
  const titleObj = `${req.session.titleObj} Home`;
  const profileObj = req.session.titleObj;
  const mode = req.session.mode;
  let profileUrl = req.session.profileUrl || 0;
  if (!titleObj) {
    throw new AppError("SOMETHING WENT WRONG", 500);
  }
  res.render("memberhome", { titleObj, profileObj, mode, private, profileUrl });
};

const homeLay = (req, res) => {
  req.session.private = private;
  const titleObj = `${req.session.titleObj} Home`;
  const profileObj = req.session.titleObj;
  const mode = req.session.mode;
  let profileUrl = req.session.profileUrl || 0;
  if (!titleObj) {
    throw new AppError("SOMETHING WENT WRONG", 500);
  }
  res.render("memberhomelay", {
    titleObj,
    profileObj,
    mode,
    private,
    profileUrl,
  });
};

const citationAcademic = catchAsync(async (req, res) => {
  const userId = req.session.user_id;
  const memberObj = await Member.findById(userId);
  const quote = new Quote(req.body);
  await quote.save();
  memberObj.quotes.push(quote);
  await memberObj.save();
  res.redirect("/lmj/member/myQuote");
});

const citationLay = catchAsync(async (req, res) => {
  const userId = req.session.user_id;
  const memberObj = await Member.findById(userId);
  const quote = new Quote(req.body);
  await quote.save();
  memberObj.quotes.push(quote);
  await memberObj.save();
  res.redirect("/lmj/member/myQuote");
});

const quotePage = catchAsync(async (req, res) => {
  const userId = req.session.user_id;
  const memberObj = await Member.findById(userId).populate("quotes");
  const titleObj = `${req.session.titleObj} Quotes`;
  const profileObj = req.session.titleObj;
  const mode = req.session.mode || "false";
  let profileUrl = req.session.profileUrl || 0;
  res.render("myquotes", {
    profileObj,
    mode,
    titleObj,
    memberObj,
    private,
    profileUrl,
  });
});

const quoteEdit = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user_id;
  const memberObj = await Member.findById(userId).populate("quotes");
  const quoteObj = await Quote.findById(id);
  const profileObj = memberObj.username;
  let mode = memberObj.mode;
  let profileUrl = memberObj.image.url || 0;
  mode = mode || "false";
  const titleObj = `${profileObj} Edit`;
  if (mode === "true") {
    res.render("memberedit", {
      profileObj,
      mode,
      titleObj,
      memberObj,
      quoteObj,
      private,
      profileUrl,
    });
  } else {
    res.render("membereditlay", {
      profileObj,
      mode,
      titleObj,
      memberObj,
      quoteObj,
      private,
      profileUrl,
    });
  }
});

const quoteDelete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user_id;
  const quoteIdDelete = await Quote.findByIdAndDelete(id);
  const memberQuoteDelete = await Member.updateOne(
    { _id: userId },
    { $pull: { quotes: id } }
  );
  res.status(204).send();
});

const quoteEditUpdate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const obj = await Quote.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect("/lmj/member/myQuote");
});

const modeModulate = catchAsync(async (req, res) => {
  const userId = req.session.user_id;
  let memberObj;
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    memberObj = await Member.findByIdAndUpdate(
      userId,
      { mode: "false" },
      {
        runValidators: true,
        new: true,
      }
    );
  } else {
    memberObj = await Member.findByIdAndUpdate(userId, req.body, {
      runValidators: true,
      new: true,
    });
  }
  await memberObj.save();
  const mode = memberObj.mode;
  req.session.mode = mode;
  if (mode === "true") {
    res.redirect("/lmj/member/home/academic");
  } else {
    res.redirect("/lmj/member/home/lay");
  }
});

const photoUploader = catchAsync(async (req, res) => {
  const userId = req.session.user_id;
  const { path, filename } = req.file;
  const memberObj = await Member.findByIdAndUpdate(userId, {
    image: { url: path, filename: filename },
  });
  const titleObj = memberObj.username;
  const mode = memberObj.mode;
  let profileUrl = path || 0;
  req.session.profileUrl = profileUrl;
  req.flash("success", "Image successfully uploaded");
  if (mode === "true") {
    res.redirect("/lmj/member/home/academic");
  } else {
    res.redirect("/lmj/member/home/lay");
  }
});

const photoDelete = catchAsync(async (req, res) => {
  const userId = req.session.user_id;
  const memberObj = await Member.findById(userId);
  if (memberObj.image.url && memberObj.image.filename) {
    cloudinary.uploader.destroy(memberObj.image.filename);
    await memberObj.updateOne({
      $unset: {
        image: { url: memberObj.image.url, filename: memberObj.image.filename },
      },
    });
    const mode = memberObj.mode;
    let profileUrl = 0;
    req.session.profileUrl = profileUrl;
    req.flash("success", "Image successfully deleted");
    if (mode === "true") {
      res.redirect("/lmj/member/home/academic");
    } else {
      res.redirect("/lmj/member/home/lay");
    }
  } else {
    throw new AppError("COULD NOT FIND IMAGE", 500);
  }
});

const deleteAccount = catchAsync(async (req, res) => {
  const userId = req.session.user_id;
  const memberObj = await Member.findByIdAndDelete(userId);
  if (memberObj.quotes) {
    const ids = memberObj.quotes;
    await Quote.deleteMany({ _id: { $in: ids } });
  }
  req.session.user_id = null;
  req.session.titleObj = null;
  req.session.mode = null;
  req.session.profileUrl = null;
  res.redirect("/lmj/home");
});

const logout = (req, res) => {
  req.session.user_id = null;
  res.redirect("/lmj/home");
};

module.exports = {
  homeAcademic,
  homeLay,
  citationAcademic,
  citationLay,
  quotePage,
  quoteEdit,
  quoteDelete,
  quoteEditUpdate,
  modeModulate,
  photoUploader,
  photoDelete,
  deleteAccount,
  logout,
};
