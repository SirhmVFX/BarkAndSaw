const usersCollection = require("../db").db().collection("users")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const { default: isEmail } = require("validator/lib/isEmail")

const User = function(data) {
    this.data = data
    this.errors = []
}

User.prototype.cleanUp = function() {
    if (typeof(this.data.firstname) != "string") {this.data.firstname = ""}
    if (typeof(this.data.lastname) != "string") {this.data.lastname = ""}
    if (typeof(this.data.email) != "string") {this.data.email = ""}
    if (typeof(this.data.password) != "string") {this.data.password = ""}
    if (typeof(this.data.confirmPassword) != "string") {this.data.confirmPassword = ""}

    if (this.data.password !== this.data.confirmPassword) {this.errors.push("Passwords does not match")}

    this.data = {
        firstname: this.data.firstname.trim().toLowercase(),
        lastname: this.data.lastname.trim().toLowercase(),
        email: this.data.email.trim().toLowercase(),
        password: this.data.password,
        confirmPassword: this.data.confirmPassword
    }
}

User.prototype.validate = function() {
    if (this.data.firstname.length < 2 ) {this.errors.push("please enter a valid firstname")}
    if (this.data.lastname.length < 2 ) {this.errors.push("please enter a valid last name")}

    if (this.data.firstname.length > 20 ) {this.errors.push("firstname can not me more than 20 characters")}
    if (this.data.lastname.length > 20 ) {this.errors.push("lastname can not me more than 20 characters")}

    if (!isAlphanumeric(this.data.firstname)) {this.errors.push("firstname should consists of character only")}
    if (!isAlphanumeric(this.data.lastname)) {this.errors.push("lastname should consists of character only")}

    if (!isEmail(this.data.email)) {this.errors.push("please enter a valid email address")}

    if (this.data.password.length < 8 && this.data.password.length > 20) {this.errors.push("Password must be atleast 8 characters and not more than 20 characters")}
}

User.prototype.register = function(){
    this.validate()
    this.cleanUp()

    if (!this.errors) {
        let salt = bcrypt.genSaltSync(10)
        this.data.password = bcrypt.hashSync(this.data.password, salt)
    }
}

module.exports = User