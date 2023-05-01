const express = require("express")
const router = express.Router()

const userController = require("./controllers/userController")

router.get("/", userController.homepage)
router.get("/login", userController.login)

module.exports = router