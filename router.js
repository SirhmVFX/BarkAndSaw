const express = require("express")
const router = express.Router()

const userController = require("./controllers/userController")

router.get("/", userController.homepage)
router.get("/login", userController.login)
router.get("/sign-up", userController.signUp)

module.exports = router