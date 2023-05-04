const express = require("express")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const flash = require("connect-flash")
const app = express()
const router = require("./router")

let sessionOptions = session({
    secret: "barkandsaw",
    store: MongoStore.create({client: require("./db")}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

app.use(sessionOptions)
app.use(flash())

app.use(function(req, res, next) {
    res.locals.user = req.session.user
    // res.locals.errors = req.session.flash("errors")
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