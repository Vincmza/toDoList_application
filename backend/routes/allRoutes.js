const express = require('express');
const router = express.Router();

const thingController = require("../controllers/thing")

router.get("/:id", thingController.getAllThings)

router.put("/:id", thingController.modifyThing)

router.post("/:id", thingController.createThing)

router.delete("/:id/deletion/:thingID", thingController.deleteOneThing)

module.exports = router;