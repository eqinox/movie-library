let User = require('mongoose').model('User');
let encryption = require('../utilities/encryption');
const jwt = require('jsonwebtoken');
const settings = require('../config/settings');

module.exports.register = (req, res) => {
    let user = req.body;
    let salt = encryption.generateSalt();
    let hashedPassword = encryption.generateHashedPassword(salt, req.body.password);

    let newUser = {
        username: req.body.username,
        hashedPassword: hashedPassword,
        roles: ['User'],
        salt: salt
    };

    User.create(newUser)
        .then(user => {
            console.log('successfuly created user');
            
            // Login user
            const token = jwt.sign({ userId: user.id }, settings.development.secret, { expiresIn: '10m' });

            res.status(200).json({
                success: true,
                message: 'successfuly registered',
                user: { username: user.username },
                token
            });
        })
        .catch(err => {
            console.log('error while creating user');
            res.status(200).json({
                success: false,
                message: err
            })
        })
}

module.exports.login = (req, res) => {
    if (!req.body.username) return res.status(400).json({ success: false, message: 'No username was provided'});
    if (!req.body.password) return res.status(400).json({ success: false, message: 'No password was provided' });
    let requestUser = req.body;

    User.findOne({ username: requestUser.username })
        .then(user => {
            if (!user) return res.status(200).json({ success: false, message: 'user not found' });
            if (!user.authenticate(requestUser.password)) return res.status(200).json({ success: false, message: 'wrong passwordd' });

            // Login user
            const token = jwt.sign({ userId: user.id }, settings.development.secret, { expiresIn: '10m' });
            res.status(200).json({
                success: true,
                message: 'successfuly logged in',
                user: { username: user.username },
                token
            });
            
        })
}

// Doesn't work!!!
module.exports.logout = (req, res) => {    
    if (req.user) {
        req.logOut();
        return res.json({
            success: true,
            message: 'You have successfully logged out!',
        })
    } else {
        return res.json({
            success: false,
            message: 'There havent user logged in',
        })
    }
}

module.exports.profile = (req, res) => {
    User.findOne({ _id: req.decoded.userId })
        .select('username id')
        .exec((err, user) => {
            if (err) return res.json({ success: false, message: err })
            if (!user) return res.json({ success: false, message: 'user not found'});

            return res.json({ success: true, user, decoded: req.decoded})
        })
}