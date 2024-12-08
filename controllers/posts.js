const postsRouter = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');

postsRouter.get('/', async (request, response) => {
  const posts = await Post.find({});
  response.json(posts);
});

postsRouter.get('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id);
  if (post) {
    response.json(post.toJSON());
  } else {
    response.status(404).end();
  }
});

postsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = await User.findById(body.userId);

  const post = new Post({
    title: body.title,
    content: body.content,
    category: body.category,
    date: new Date(),
    user: user._id
  });

  const savedPost = await post.save();
  user.posts = user.posts.concat(savedPost._id);
  await user.save();

  response.status(201).json(savedPost);
});

postsRouter.delete('/:id', async (request, response) => {
  await Post.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

postsRouter.put('/:id', (request, response, next) => {
  const body = request.body;
  const post = {
    title: body.title,
    content: body.content,
    category: body.category
  };

  Post.findByIdAndUpdate(request.params.id, post, { new: true })
    .then((updatedPost) => {
      response.json(updatedPost);
    })
    .catch((error) => next(error));
});

module.exports = postsRouter;
            