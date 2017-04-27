/// from https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0
// const Promise = require('bluebird');

const jwt = require('jsonwebtoken');
const config = require('../config.json');

function generateToken(user) {
    let u = {
        username: user.username,
        id: user.id.toString()
    };
    let token =  jwt.sign(u, config.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
    return token;
}

function verifyToken(token, cb) {
    return jwt.verify(token, config.JWT_SECRET, cb);
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,

};