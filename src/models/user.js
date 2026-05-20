const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid")
            }
        }
    },

    photoUrl: {
        type: String,
        default: "https://www.vecteezy.com/png/24983914-simple-user-default-icon"
    },

    about: {
        type: String,
        default: "This is default about for a user"
    },

    skills: {
        type: [String]
    },



},
{
    timestamps : true
});

module.exports = mongoose.model("user", userSchema);