const express = require("express")
const session = require("express-session")
const app = express()
const router = require("./router")

let sessionOptions = session({
    secret: "barkandsaw",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

app.use(sessionOptions)

app.use(function(req, res, next) {
    res.locals.session = req.session.user
    next()
})

app.use(express.static("public"))
app.use(express.static("public/images"))
app.set("views", "views")
app.set("view engine", "ejs")

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/", router)

module.exports = app