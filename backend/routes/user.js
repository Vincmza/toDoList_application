const express = require('express');
const router = express.Router();

const userController = require("../controllers/user")

router.post("/signup", userController.signup)
router.post("/login", userController.login)

//SET UP SECRET QUESTION AND ANSWER AFTER THE ACCOUNT IS CREATED
router.put("/:id/modification", userController.addSecretQuestionAndAnswer)

//MODIFY PASSWORD IF IT IS FORGOTTEN
// 1 -- SEND THE SECRET QUESTION TO THE USER IF IT IS SET UP
router.get("/forgottenPassowrd/getSecretQuestion", userController.getSecretQuestion)
// 2 -- ANSWER THE SECRET QUESTION AND CHECK IF IT IS RIGHT
router.post("/forgottenPassword/answerToSecretQuestion", userController.answerSecretQuestion)
// 3 -- UPDATE THE PASSWORD
router.put("/updatePassword", userController.updatePassword)

module.exports = router;