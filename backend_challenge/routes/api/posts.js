const express = require("express");
const asyncHandler = require("express-async-handler");

const { Post, Coffee } = require("../../db/models");
const { Op } = require("sequelize")

const router = express.Router();

/*

GET /post/ping    returns {'status': 'good'}
GET /post         all coffees (asc order)
GET /post/<id>
GET /post/coffee  all posts w/ coffee id - sorted by date
POST /post
DELETE /post/<id>

*/

router.get(
  "/ping",
  asyncHandler(async (req, res) => {
    return res.json({ status: "good" });
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const posts = await Post.findAll({
      order: [["createdAt", "ASC"]],
      include: [{model: Coffee}],
    });
    return res.json(posts);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    return res.json(post);
  })
);

router.get(
  "/coffee/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    let post;
    if (!isNaN(id)) {
      post = await Post.findAll({
        where: { coffee: id },
      });
    } else {
      const coffeeObj = await Coffee.findOne({
        where: { name: {[Op.iLike]: id }}
      })
      post = await Post.findAll({
        where: { coffee: coffeeObj.id},
      });

    }
    return res.json(post);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const post = await Post.create(req.body);
    const newPost = await Post.findByPk(post.id);
    return res.json(newPost);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) throw new Error("Cannot find Coffee");
    await post.destroy();
    return res.json(Post);
  })
);

module.exports = router;
