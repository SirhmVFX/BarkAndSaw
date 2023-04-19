const express = require("express")
const router = express.Router()

router.get("/", userController.homepage)

module.exports = router