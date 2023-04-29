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
    const coffees = await Coffee.findAll();
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

module.exports = router;
