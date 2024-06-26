const Jwt  = require('@hapi/jwt');
const bcrypt = require('bcrypt');
require('dotenv').config()

const {getAllUsers, getUserByEmail} = require('../helpers/userHelper')

const verifyRegisterInput = async (username, email) => {
    var verification = {message: "Successful Validation", status: false};

    const accountList = await getAllUsers();
    for(var account of accountList){
        if (account.username.toLowerCase() === username.toLowerCase()){
            verification.message = "Username already taken";
            return verification;
        } else if (account.email.toLowerCase() === email.toLowerCase()){
            verification.message = "Email already taken";
            return verification;
        }
    }

    verification.status = true;
    return verification;
}

const verifyLoginCredential = async (email, password) => {
    var verification = {message: "Wrong email or password", status: false};

    const account = await getUserByEmail(email);
    if (account === undefined){
        return verification;
    }
    
    const differentPassword = await bcrypt.compare(password, account.password);
    if(!differentPassword){
        return verification;
    } 

    verification.message = "Success";
    verification.status = true;
    verification.account = account;
    return verification;
}

const generateAccessToken = (id, email, username) => {
    return Jwt.token.generate(
        {
            aud: false,
            iss: false,
            id: id,
            email: email,
            username: username,
            type: 'access'
        },
        {
            key: process.env.JWT_SECRET_KEY,
            algorithm: 'HS512'
        },
        {
            ttlSec: 300
        }
    );    
}

const generateRefreshToken = (id) => {
    return Jwt.token.generate(
        {
            aud: false,
            iss: false,
            id: id,
            type: 'refresh'
        },
        {
            key: process.env.JWT_SECRET_KEY,
            algorithm: 'HS512'
        },
        {
            ttlSec: 604800
        }
    );    
}

module.exports = {verifyRegisterInput, verifyLoginCredential, generateAccessToken, generateRefreshToken};