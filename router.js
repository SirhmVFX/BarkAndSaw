const express = require("express")
const router = express.Router()

const userController = require("./controllers/userController")

router.get("/", userController.homepage)
router.get("/sign-in", userController.signIn)
router.post("/login", userController.login)
router.get("/sign-up", userController.signUp)
router.post("/register", userController.register)
router.post("/logout", userController.logout)

router.get("/profile", userController.profile)
router.get("/admin/dashboard", userController.dashboard)


router.get("/categories", userController.categories)
router.get("/singleproduct", userController.singleProduct)
module.exports = router