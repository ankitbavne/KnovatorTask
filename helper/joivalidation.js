const Joi = require("joi");
let response = require("./response");
let MESSAGE = require("../helper/appMessage");

module.exports = {
  registration: async (req, res, next) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        mobile: Joi.string().min(10).max(12).required(),
        password: Joi.string().required(),
      });
      const { error, value } = schema.validate(req.body);
      if (error) {
        return response.CustomError(
          res,
          400,
          MESSAGE.VALIDATION_ERROR,
          error.message
        );
      }
      next();
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  login: async (req, res, next) => {
    try {
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      });
      const { error, value } = schema.validate(req.body);
      if (error) {
        return response.CustomError(
          res,
          400,
          MESSAGE.VALIDATION_ERROR,
          error.message
        );
      }
      next();
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  addPostValidator: async (req, res, next) => {
    try {
      const schema = Joi.object({
        title: Joi.string(),
        body: Joi.string(),
        geoLocation: Joi.object().keys({
          latitude: Joi.string().required(),
          longitude: Joi.string().required(),
        }),
        status: Joi.string().required(),
        createdBy: Joi.string().required(),
      });
      const { error, value } = schema.validate(req.body);
      if (error) {
        return response.CustomError(
          res,
          400,
          MESSAGE.VALIDATION_ERROR,
          error.message
        );
      }
      next();
    } catch (error) {
      console.log("error 58=========================>", error);
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  getPostValidator: async (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      const { error, value } = schema.validate(req.query);
      if (error) {
        return response.CustomError(
          res,
          400,
          MESSAGE.VALIDATION_ERROR,
          error.message
        );
      }
      next();
    } catch (error) {
      console.log("error 58=========================>", error);
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  updatePostValidator: async (req, res, next) => {
    try {
      const schema = Joi.object({
        title: Joi.string(),
        body: Joi.string(),
        geoLocation: Joi.object().keys({
          latitude: Joi.string().required(),
          longitude: Joi.string().required(),
        }),
        status: Joi.string().required(),
        id: Joi.string().required(),
      });
      const { error, value } = schema.validate(req.body);
      if (error) {
        return response.CustomError(
          res,
          400,
          MESSAGE.VALIDATION_ERROR,
          error.message
        );
      }
      next();
    } catch (error) {
      console.log("error 58=========================>", error);
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  deletePostValidator: async (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      const { error, value } = schema.validate(req.params);
      if (error) {
        return response.CustomError(
          res,
          400,
          MESSAGE.VALIDATION_ERROR,
          error.message
        );
      }
      next();
    } catch (error) {
      console.log("error 58=========================>", error);
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },
};
