const {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController,
} = require("../controller/book.controller");

const express = require("express");

const router = express.Router();

router.post("/addbook", handleBookStoreController);

router.get("/booklists", handleBookListController);

router.post("/deletebook", handleBookDeleteController);

router.put("/updatebook", handleBookUpdateController);

module.exports = router;
