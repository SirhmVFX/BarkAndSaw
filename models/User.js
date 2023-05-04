const bcrypt = require("bcryptjs")
const validator = require("validator")
const usersCollection = require("../db").db().collection("users")

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
        firstname: this.data.firstname.trim().toLowerCase(),
        lastname: this.data.lastname.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password,
        confirmPassword: this.data.confirmPassword
    }
}

User.prototype.validate = function() {
    if (this.data.firstname.length < 2 ) {this.errors.push("please enter a valid firstname")}
    if (this.data.lastname.length < 2 ) {this.errors.push("please enter a valid last name")}

    if (this.data.firstname.length > 20 ) {this.errors.push("firstname can not me more than 20 characters")}
    if (this.data.lastname.length > 20 ) {this.errors.push("lastname can not me more than 20 characters")}

    if (!validator.isAlphanumeric(this.data.firstname)) {this.errors.push("firstname should consists of character only")}
    if (!validator.isAlphanumeric(this.data.lastname)) {this.errors.push("lastname should consists of character only")}

    if (!validator.isEmail(this.data.email)) {this.errors.push("please enter a valid email address")}

    if (this.data.password.length < 8 && this.data.password.length > 20) {this.errors.push("Password must be atleast 8 characters and not more than 20 characters")}
}

User.prototype.register = function(){
    return new Promise(async (resolve, reject) => {
        await this.validate()
        this.cleanUp()
    
        if (!this.errors.length) {
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            this.data.confirmPassword = bcrypt.hashSync(this.data.confirmPassword, salt)
    
            await usersCollection.insertOne(this.data)
            resolve()
        } else {
            reject(this.errors)
        }
        
        
    })
}

module.exports = User