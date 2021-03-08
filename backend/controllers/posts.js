const Post = require('../models/post');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      post = new Post ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        title: req.body.title,
        description: req.body.description,
        imageUrl: url + '/images/' + req.file.filename,
        userId: req.body.userId
      });
      post.save().then(
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
  } else {
      post = new Post ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        title: req.body.title,
        description: req.body.description,
        imageUrl: '',
        userId: req.body.userId
        });
        post.save().then(
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

  exports.getOnePost = (req, res, next) => {
    Post.findOne({
      _id: req.params.id
    }).then(
      (post) => {
        res.status(200).json(post);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

  exports.modifyPost = (req, res, next) => {
      let post = new Post({ _id: req.params._id });
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        post = {
          _id: req.params.id,
          title: req.body.post.title,
          description: req.body.post.description,
          imageUrl: url + '/images/' + req.file.filename,
          userId: req.body.post.userId
        };
    } else {
        post = {
            _id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            userId: req.body.userId
          };
    }

    Post.updateOne({_id: req.params.id}, post).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.postRaiting = (req, res, next) => {
    Post.findOne({_id: req.params.id}).then(
        (post) => {
            if (req.body.like == 1) {
                post.usersLiked.push(req.body.userId)
                if (post.likes == null) {
                  post.likes = 1
                } else {
                  post.likes += 1
                }
            } else if (req.body.like == 0 && post.usersLiked.includes(req.body.userId)) {
                post.usersLiked.remove(req.body.userId)
                post.likes -= 1
            } else if (req.body.like == -1) {
                //post.usersDisliked.push(req.body.userId) 
                //post.dislikes += 1
            } else if (req.body.like == 0 && post.usersDisliked.includes(req.body.userId)) {
               // post.usersDisliked.remove(req.body.userId) 
                //post.dislikes -= 1
            }
            post.save().then(
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
    );
};

  exports.deletePost = (req, res, next) => {
    Post.findOne({_id: req.params.id}).then(
        (post) => {
          if (post.imageUrl != '') {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Post.deleteOne({_id: req.params.id}).then(
                    () => {
                      res.status(200).json({
                        message: 'Deleted!'
                      });
                    }
                  ).catch(
                    (error) => {
                      res.status(400).json({
                        error: error
                      });
                    }
                  );
            });
          } else {
            Post.deleteOne({_id: req.params.id}).then(
              () => {
                res.status(200).json({
                  message: 'Deleted!'
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
            
        }
    );
  };

  exports.getAllStuff = (req, res, next) => {
    Post.find({ }).sort( { _id : -1} ).then(
      (posts) => {
        res.status(200).json(posts);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };