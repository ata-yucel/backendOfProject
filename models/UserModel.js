const { Schema, model } = require("mongoose");
const validator = require("validator");

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is Required!'],
        minlength: [4, 'Username must be 4 characters!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        minlength: [5, 'Password must be 5 characters!'],
        validate: {
            validator: function(value) {
                // Şifrede en az bir sayı olup olmadığını kontrol eder
                return validator.matches(value, /\d/);
            },
            message: 'Password must contain at least 1 number!'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is Required!'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Email is Invalid!'
        }
    },
    balance: {
        type: Number,
        required: [true, 'Balance is Required!'],
        default: 0
    },
    birthDate: {
        type: Date,
        required: [true, 'Birth Date is Required!'],
        validate: {
            validator: function(value) {
                const currentDate = new Date();
                const userDate = new Date(value);
                const age = currentDate.getFullYear() - userDate.getFullYear();
                return age >= 18;
            },
            message: 'User must be at least 18 years old!'
        }
    }
});

const User = model("UserModel", UserSchema);
module.exports = User;
