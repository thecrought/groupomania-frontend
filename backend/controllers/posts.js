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
        likes: 0,
        dislikes: 0,
        usersLiked: '[]',
        usersDisliked: '[]',
        userRead: '[]',
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
        likes: 0,
        dislikes: 0,
        usersLiked: '[]',
        usersDisliked: '[]',
        userRead: '[]',
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
    Post.findOne({where: {id:req.params.id}}).then(
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
      let post = Post.findOne({where: {id:req.params.id}});
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        post = {
          id: req.params.id,
          title: req.body.title,
          description: req.body.description,
          imageUrl: url + '/images/' + req.file.filename,
        };
    } else {
        post = {
            id: req.params.id,
            title: req.body.title,
            description: req.body.description,
          };
    }

    Post.update(post, {where: {id:req.params.id}}).then(
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
      Post.findOne({where: {id:req.params.id}}).then(
        (post) => {
          //post.usersLiked = JSON.stringify(post.usersLiked);
          post.usersLiked = JSON.parse(post.usersLiked);
          if (req.body.like == 1) {
            post.usersLiked.push(req.body.userId)
            if (post.likes == null) {
              post.likes = 1
            } else {
              post.likes += 1
            }
        } else if (req.body.like == 0 && post.usersLiked.includes(req.body.userId)) {
            let index = post.usersLiked.findIndex(x => x ==req.body.userId.toString());
            post.usersLiked.splice(index, 1);
            //post.usersLiked.remove("1");
            post.likes -= 1
            /*res.status(201).json({
              message: post.usersLiked
          });*/
        } 
        post.usersLiked = JSON.stringify(post.usersLiked)
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
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
  };

  exports.postDislike = (req, res, next) => {
    Post.findOne({where: {id:req.params.id}}).then(
      (post) => {
        post.usersDisliked = JSON.parse(post.usersDisliked);
        if (req.body.dislike == 1) {
          post.usersDisliked.push(req.body.userId)
          if (post.dislikes == null) {
            post.dislikes = 1
          } else {
            post.dislikes += 1
          }
      } else if (req.body.dislike == 0 && post.usersDisliked.includes(req.body.userId)) {
          let index = post.usersDisliked.findIndex(x => x ==req.body.userId.toString());
          post.usersDisliked.splice(index, 1);
          post.dislikes -= 1
      } 
      post.usersDisliked = JSON.stringify(post.usersDisliked)
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
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    ); 
};

exports.postRead = (req, res, next) => {
  Post.findOne({where: {id:req.params.id}}).then(
      (post) => {
        post.userRead = JSON.parse(post.userRead);
          if (!post.userRead.includes(req.body.userId)) {
              post.userRead.push(req.body.userId)
              post.userRead = JSON.stringify(post.userRead);
              post.save().then(
                () => {
                    res.status(201).json({
                        message: 'Post is been read successfully!'
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

  exports.deletePost = (req, res, next) => {
    Post.findOne({where: {id:req.params.id}}).then(
        (post) => {
          if (post.imageUrl != '') {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                post.destroy().then(
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
            post.destroy().then(
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
    Post.findAll({order:[["createdAt","DESC"] ]}).then(
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