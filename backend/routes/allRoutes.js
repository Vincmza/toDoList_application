const express = require('express');
const router = express.Router();

const thingController = require("../controllers/thing")

router.get("/:id", thingController.getAllThings)

router.put("/:id/modification/:thingID", thingController.modifyThing)

router.post("/:id/creation", thingController.createThing)

router.delete("/:id/deletion/:thingID", thingController.deleteOneThing)

router.delete("/:id/deleteAll/:isDone", thingController.deleteAll)

module.exports = router;