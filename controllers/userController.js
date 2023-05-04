const User = require("../models/User")

exports.homepage = function(req, res) {
    res.render("homepage", {pageTitle: "Bark&Saw"})
}

exports.signIn = function(req, res) {
    res.render("login", {pageTitle: "Login-Bark&Saw", errors: req.flash("logErrors")})
}

exports.signUp = function (req, res) {
    res.render("sign-up")
}

exports.register = function(req, res) {
    let user = new User(req.body)
    user.register().then(function(){
        res.redirect("/login")
    }).catch(function(e){
        req.flash("regErrors", e)
        req.session.save(function() {
            res.redirect("/")
        })
    })
}

exports.login = function(req, res) {
    let user = new User(req.body)
    user.login().then(function(result){
        req.session.user = {email: user.data.email, _id: user.data._id}
        req.session.save(function() {
            res.redirect("/") 
        })
    }).catch(function(e){
        req.flash("logErrors", e)
        req.session.save(function() {
            res.redirect("/sign-in")
        })
    })
}

exports.profile = function(req, res) {
    if (req.session.user) {
        res.render("profile")
    } else {
        res.redirect("/sign-in")
    }
}

exports.logout = function(req, res) {
    req.session.destroy(function(){
        res.redirect("/")
    })
}