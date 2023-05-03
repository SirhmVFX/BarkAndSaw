const User = require("../models/User")

exports.homepage = function(req, res) {
    res.render("homepage", {pageTitle: "Bark&Saw"})
}

exports.login = function(req, res) {
    res.render("login", {pageTitle: "Login-Bark&Saw"})
}

exports.signUp = function (req, res) {
    res.render("sign-up")
}

exports.register = function(req, res) {
    let user = new User(req.body)
    user.register().then(function(){
        res.render("/")
    }).catch(function(){
        res.send(user.errors)
    })
}

exports.singIn = function(req, res) {

}