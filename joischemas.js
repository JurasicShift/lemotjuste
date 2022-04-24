const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");
const AppError = require("./utilities/apperror");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!"
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if(clean !== value) return helpers.error("string.escapeHTML", {value});
        return clean;
      }
    }
  }
})

const Joi = BaseJoi.extend(extension);


module.exports.loginJoi = (req, res, next) => {
    const memberSchema = Joi.object().keys({
      username: Joi.string().trim().required().escapeHTML(),
      password: Joi.string().trim().min(8).required().escapeHTML(),
      cookieChecker: Joi.string().escapeHTML()
    })

    const { error } = memberSchema.validate(req.body);
    if(error) {
      const msg = error.details.map(el => el.message).join(",");
      throw new AppError(msg, 400);
    } else {
      next();
    }
  }

  module.exports.createAcJoi = (req, res, next) => {
    const memberSchema = Joi.object().keys({
      username: Joi.string().trim().required().escapeHTML(),
      email: Joi.string().email().trim().required().escapeHTML(),
      password: Joi.string().trim().min(8).required().escapeHTML(),
      conPassword: Joi.string().trim().min(8).required().escapeHTML(),
      mode: Joi.string().escapeHTML()
    })

    const { error } = memberSchema.validate(req.body);
    if(error) {
      const msg = error.details.map(el => el.message).join(",");
      throw new AppError(msg, 400);
    } else {
      next();
    }
  }

module.exports.citationJoi = (req, res, next) => {
  const memberSchema = Joi.object().keys({
    quote: Joi.string().trim().required().escapeHTML(),
    surname: Joi.string().trim().required().escapeHTML(),
    firstname: Joi.string().trim().required().escapeHTML(),
    page: Joi.string().allow(null, '').trim().escapeHTML(),
    year: Joi.string().allow(null, '').trim().escapeHTML(),
    title: Joi.string().allow(null, '').trim().escapeHTML(),
    publisher: Joi.string().allow(null, '').trim().escapeHTML(),
    place: Joi.string().allow(null, '').trim().escapeHTML()
  })

  const { error } = memberSchema.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
}

module.exports.layCitationJoi = (req, res, next) => {
  const memberSchema = Joi.object().keys({
    quote: Joi.string().trim().required().escapeHTML(),
    surname: Joi.string().trim().required().escapeHTML(),
    firstname: Joi.string().trim().required().escapeHTML()
  })
  const { error } = memberSchema.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
}

module.exports.uploadFileJoi = (req, res, next) => {
  const memberSchema = Joi.object().keys({
    path: Joi.string().domain().trim().required().escapeHTML(),
    filename: Joi.string().trim().required().escapeHTML()
  })
  const { error } = memberSchema.validate(req.file);
  if(error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new AppError(msg, 400);
  } else {
    next();
  }
}