const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    mode: {
        type: String,
    },
    image:
        {
            url: String,
            filename: String
        },
    quotes: [
        {
            type: Schema.Types.ObjectId,
            ref: "MemberQuote"
        }
    ]
})

memberSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({username});
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

memberSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;