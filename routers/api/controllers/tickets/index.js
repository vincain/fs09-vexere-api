const express = require("express");
const users = require("./ticket.controller")
const router = express.Router();
const {authenticate, authorize} = require("../../../../middlewares/auth");

router.post("", authenticate, authorize(["client"]),  users.createTicket);

module.exports = router;