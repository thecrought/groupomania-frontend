const Comment = require('../models/comments');

exports.createComment = (req, res, next) => {
 {
        comment = new Comment ({
          postId: req.body.postId,
          comment: req.body.comment,
          user: JSON.stringify(req.body.user)
        });
        comment.save().then(
          () => {
            res.status(201).json({
              message: 'Post saved successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
    } 
  };

exports.getComments = (req, res, next) => {
    Comment.findAll({order:[["createdAt","DESC"] ]}).then(
        (comments) => {
          res.status(200).json(comments);
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
  };