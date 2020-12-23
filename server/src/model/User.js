const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    roles: {
        type: [String], enum: ["admin", "mod", "user"], default: ["user"]
    }
});

userSchema.pre("save", function (next) {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(this.password, salt);
        this.password = hashedPass;
        next()
    } catch (error) {
        next(error);
    }
})

userSchema.methods.isValidPassword = function (password) {
    try {
        return bcrypt.compareSync(password, this.password)
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model("User", userSchema);