const express = require("express");
const controller = require("../controllers/donateController");
const router = express.Router();



router.post("/donate",controller.donatefunc);

module.exports = router;

