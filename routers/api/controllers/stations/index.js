const express = require("express");
const stations = require("./station.controller")
const router = express.Router();
const {authenticate, authorize} = require("../../../../middlewares/auth");

router.get("", stations.getStations);
router.get("/:id", stations.getStationById);
router.post("/", authenticate, authorize(["admin"]), stations.postStations);
router.put("/:id", authenticate, authorize(["admin"]), stations.putStationById);
router.patch("/:id", authenticate, authorize(["admin"]), stations.patchStationById);
router.delete("/:id", authenticate, authorize(["admin"]), stations.deleteStationById);

module.exports = router;