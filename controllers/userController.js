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
    user.login().then(function(result){
        req.session.user = {username: user.data.username, _id: user.data._id}
        req.session.save(function() {
            res.redirect("/") 
        })
    }).catch(function(e){
        req.session.save(function(){
            res.send(e)
        })

    })
}