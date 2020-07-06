const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    fullname: {type: String, required: true},
    userType: {type: String, default: "client"},
    avatar: {type: String}
}, {
    timestamps: true
})

// UserSchema.methods.hashPassword = async (req, res, )

UserSchema.pre('save', async function (next) {
    const user = this;
    if(user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next();
})

const User = mongoose.model("User", UserSchema, "User")

module.exports = {
    UserSchema,
    User
}