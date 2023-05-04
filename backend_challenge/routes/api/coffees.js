const express = require("express");
const asyncHandler = require("express-async-handler");

const { Coffee, Post } = require("../../db/models");

const router = express.Router();

/*

GET /coffee/ping    returns {'status': 'good'}
GET /coffee         all coffees (asc order)
GET /coffee/<id>
POST /coffee/create/
DELETE /coffee/delete/<id>

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
    const coffees = await Coffee.findAll({
      order: [["name", "ASC"]],
    });
    return res.json(coffees);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const coffee = await Coffee.findByPk(req.params.id);
    return res.json(coffee);
  })
);

router.post("/", asyncHandler(async(req, res) => {
  const coffee = await Coffee.create(req.body);
  const newCoffee = await Coffee.findByPk(coffee.id)
  return res.json(newCoffee)
}))

router.delete("/:id", asyncHandler(async(req, res) => {
  const {id} = req.params
  const coffee = await Coffee.findByPk(id)
  const posts = await Post.findAll({
    where: {coffee: id}
  })
  if (!coffee) throw new Error("Cannot find Coffee")
  await coffee.destroy()
  return res.json({coffee, posts})
}))

module.exports = router;
