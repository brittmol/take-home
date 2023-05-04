const router = require("express").Router();
const coffeeRouter = require("./coffees.js");
const postRouter = require("./posts.js");

router.use("/coffees", coffeeRouter);
router.use("/posts", postRouter);

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
