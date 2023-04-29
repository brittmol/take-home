const express = require("express");
const asyncHandler = require("express-async-handler");

const {Coffee, Post} = require("../../db/models")

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
      const posts = await Post.findAll();
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

module.exports = router;
