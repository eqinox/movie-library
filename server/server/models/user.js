const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

const ERROR_VALIDATION_MESSAGE = '{PATH} is required';

let userScheme = mongoose.Schema(({
    username: { type: String, required: ERROR_VALIDATION_MESSAGE, unique: true },
    roles: [{ type: String }],
    hashedPassword: { type: String, required: ERROR_VALIDATION_MESSAGE },
    salt: { type: String, required: ERROR_VALIDATION_MESSAGE }
}));

userScheme.method({
    authenticate: function (password) {
        let hashedPassword = encryption.generateHashedPassword(this.salt, password)

        if (hashedPassword === this.hashedPassword) {
            return true
        }

        return false
    }
});

let User = mongoose.model('User', userScheme);

module.exports = User;