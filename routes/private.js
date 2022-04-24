
const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const {
  citationJoi,
  layCitationJoi,
  uploadFileJoi,
} = require("../joischemas.js");

const { requireLogin, dataCheck } = require("../middleware");

const Private = require("../controllers/private");

router.get("/home/academic", requireLogin, Private.homeAcademic);

router.get("/home/lay", requireLogin, Private.homeLay);

router.post(
  "/home/academic",
  requireLogin,
  citationJoi,
  Private.citationAcademic
);

router.post("/home/lay", requireLogin, layCitationJoi, Private.citationLay);

router.get("/myQuote", requireLogin, Private.quotePage);

router.get("/:id/edit", requireLogin, Private.quoteEdit);

router.put("/:id/edit", requireLogin, citationJoi, Private.quoteEditUpdate);

router.delete("/:id/delete", requireLogin, Private.quoteDelete);

router.post("/modulate", requireLogin, Private.modeModulate);

router.post(
  "/photoUpload",
  requireLogin,
  uploadFileJoi,
  dataCheck,
  upload.single("filename"),
  Private.photoUploader
);

router.put("/photoDelete", requireLogin, Private.photoDelete);

router.delete("/deleteAc", requireLogin, dataCheck, Private.deleteAccount);

router.get("/logout", requireLogin, Private.logout);

module.exports = router;
