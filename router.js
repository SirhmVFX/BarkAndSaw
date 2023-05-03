const express = require("express")
const router = express.Router()

const userController = require("./controllers/userController")

router.get("/", userController.homepage)
router.get("/login", userController.login)
router.post("/login", userController.signIn)
router.get("/sign-up", userController.signUp)
router.post("/sign-up", userController.register)

module.exports = router