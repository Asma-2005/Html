const express = require("express");
const router = express.Router();
const Control = require("../controllers/requestController");

//filtiration by the 
router.get('/filter',Control.filter);

// Send a new request
// router.post("/request", Control.createRequest);

// // Cancel a request (if still pending)
// router.delete("/request/:requestId",Control.cancelRequest);

// // Get details of a specific request
// router.get("/request/:requestId", Control.getRequestById);

module.exports = router;