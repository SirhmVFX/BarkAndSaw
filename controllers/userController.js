const User = require("../models/User")

exports.homepage = function(req, res) {
    res.render("homepage", {pageTitle: "Bark&Saw"})
}

exports.signIn = function(req, res) {
    res.render("login", {pageTitle: "Login-Bark&Saw"})
}

exports.signUp = function (req, res) {
    res.render("sign-up")
}

exports.register = function(req, res) {
    let user = new User(req.body)
    user.register().then(function(){
        res.redirect("/login")
    }).catch(function(){
        res.send(user.errors)
    })
}

exports.login = function(req, res) {
    let user = new User(req.body)
    user.login().then(function(){
        
    }).catch(function(){
        
    })
}