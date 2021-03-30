const db = require("../config/db.config");
const {Sequelize, DataTypes} = require("sequelize");

  const Comment = db.define("comment", {
    comment: {
      type: DataTypes.STRING
    },
    postId: {
      type: DataTypes.STRING
    },
    user: {
      type: DataTypes.STRING
    }
  });

  module.exports = Comment;