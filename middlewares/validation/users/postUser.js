const validator = require("validator")
const _ = require("lodash")
const {User} = require("../../../models/User")

const validatePostUser = async (req, res, next) => {
    let errors = {}

    const email = _.get(req, "body.email", "");
    const password = _.get(req, "body.password")
    const password2 = _.get(req, "body.password2")
    const fullname = _.get(req, "body.fullname")
    const userType = _.get(req, "body.userType", "client")

    //validate email
    //email empty?
    if (validator.isEmpty(email)) {
        errors.email = "Email is required"
    } 
    //email valid?
    else if (!validator.isEmail(email)) {
        errors.email = "Email is invalid"
    }
    //email exist
    else {
        const user = await User.findOne({email})
        if(user) errors.email = "Email exists"
    }

    //validate password
    if (validator.isEmpty(password)) {
        errors.password = "Password is required"
    }
    else if (!validator.isLength(password, {min: 6})) {
        errors.password = "Password must have at least 6 characters"
    }

    //validate password 2
    if (validator.isEmpty(password2)) {
        errors.password2 = "Confirm Password is required"
    }
    else if (!validator.equals(password,password2)) {
        errors.password2 = "Confirm Password must be matched"
    }

    //validate fullname
    if (validator.isEmpty(fullname)) {
        errors.fullname = "Full Name is required"
    }

    if(_.isEmpty(errors)) return next(); //pass validate
    return res.status(400).json(errors)
    
}

module.exports = {
    validatePostUser
}