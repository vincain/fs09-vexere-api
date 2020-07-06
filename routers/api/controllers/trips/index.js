const express = require("express");
const trips = require("./trip.controller")
const router = express.Router();
const {authenticate, authorize} = require("../../../../middlewares/auth");

router.get("", trips.getTrips);
router.get("/:id", trips.getTripById);
router.post("", authenticate, authorize(["admin"]), trips.postTrips);
// router.put("/:id", trips.putTripById);
router.patch("/:id", authenticate, authorize(["admin"]), trips.patchTripById);
router.delete("/:id", authenticate, authorize(["admin"]), trips.deleteTripById);

module.exports = router;