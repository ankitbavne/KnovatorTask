let mongoose = require("mongoose");
let connection = require("../helper/database");
let config = require("../config.json");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let Post = require("../model/post/post.model");
let MESSAGE = require("../helper/appMessage");
let response = require("../helper/response");

module.exports = {
  //Create Post
  createPost: async (req, res) => {
    try {
      const user = req.user;
      console.log(user);
      const post = await new Post(req.body).save();
      return response.successResponse(
        res,
        200,
        MESSAGE.ADD_POST_SUCCESSFULLY,
        post
      );
    } catch (error) {
      console.log("error ", error);
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  // Get Post By PostId
  getPost: async (req, res) => {
    try {
      const user = req.user;
      const { id } = req.query;
      const getPost = await Post.findOne({ _id: id });
      if (getPost) {
        return response.successResponse(
          res,
          200,
          MESSAGE.GET_POST_SUCCESSFULLY,
          getPost
        );
      } else {
        return response.conflictErrorMsgResponse(
          res,
          500,
          MESSAGE.SOMETHING_WENT_WRONG
        );
      }
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  //Get Post By Geolocation
  getPostByGeoLocation: async (req, res) => {
    try {
      const user = req.user;
      const { geoLocation } = req.body;
      const getPost = await Post.find({ geoLocation: geoLocation });
      if (getPost.length > 0) {
        return response.successResponse(
          res,
          200,
          MESSAGE.GET_POST_SUCCESSFULLY,
          getPost
        );
      } else {
        return response.conflictErrorMsgResponse(
          res,
          500,
          MESSAGE.SOMETHING_WENT_WRONG
        );
      }
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  // Update Post
  updatePost: async (req, res) => {
    try {
      const user = req.user;
      const { id, title, body, status, geoLocation } = req.body;
      const condition = {
        title: title,
        body: body,
        status: status,
        geoLocation: geoLocation,
      };
      const updatePost = await Post.findOneAndUpdate(
        { _id: id },
        { $set: condition },
        { new: true }
      );
      console.log("-------", updatePost);
      if (updatePost) {
        const getPost = await Post.findOne(updatePost._id);
        return response.successResponse(
          res,
          200,
          MESSAGE.POST_UPDATED_SUCCESSFULLY,
          getPost
        );
      } else {
        return response.conflictErrorMsgResponse(
          res,
          500,
          MESSAGE.SOMETHING_WENT_WRONG
        );
      }
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  //Delete Post
  deletePost: async (req, res) => {
    try {
      const user = req.user;
      const id = req.params.id;
      const deletePost = await Post.findOneAndDelete({ _id: id });
      if (deletePost) {
        return response.successResponse(
          res,
          200,
          MESSAGE.POST_DELETED_SUCCESSFULLY,
          deletePost
        );
      } else {
        return response.conflictErrorMsgResponse(
          res,
          500,
          MESSAGE.SOMETHING_WENT_WRONG
        );
      }
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },

  //Count of Active & Inactive post in dashboard
  countActiveAndInactive: async (req, res) => {
    try {
      const user = req.user;
      const activePost = await Post.find({ status: "Active" }).countDocuments();
      const inactivePost = await Post.find({
        status: "InActive",
      }).countDocuments();
      const response = {
        activeCount: activePost,
        inactiveCount: inactivePost,
      };
      res.status(200).json({
        status: "SUCCESS",
        code: 200,
        message: MESSAGE.ACTIVE_AND_INACTIVE_COUNT,
        data: response,
      });
    } catch (error) {
      return response.conflictErrorMsgResponse(
        res,
        500,
        MESSAGE.SOMETHING_WENT_WRONG
      );
    }
  },
};
