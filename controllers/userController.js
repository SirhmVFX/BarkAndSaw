exports.homepage = function(req, res) {
    res.render("homepage", {pageTitle: "Bark&Saw"})
}

exports.login = function(req, res) {
    res.render("login", {pageTitle: "Login-Bark&Saw"})
}