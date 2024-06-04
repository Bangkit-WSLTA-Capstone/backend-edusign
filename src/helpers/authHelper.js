const Jwt  = require('@hapi/jwt');
const {getAllUsers, createUser, getUserByEmail} = require('../helpers/userHelper')

const verifyRegisterInput = (username, email, password, repeatPassword) => {
    var verification = {message: "Successful Validation", status: false};

    if(password !== repeatPassword){
        verification.message == "Password and Repeat Password does not match up"
        return verification;
    }

    //TODO: Connect to profile API and get all profiles
    const accountList = getAllUsers();
    for(var account in accountList){
        //TODO: Probably check for upper/lowercase too
        if (account.username === username){
            verification.message = "Username already taken";
            return verification;
        } else if (account.email === email){
            verification.message = "Email already taken";
            return verification;
        }
    }

    verification.status = true;
    return verification;
}

const verifyLoginCredential = (email, password) => {
    var verification = {message: "Wrong email or password", status: false};

    //TODO: Connect to profile API and get profile
    const account = getUserByEmail(email);
    if (account.keys(obj).length === 0){
        return verification;
    }
    if (account.password !== password){
        return verification;
    }
    verification.message = "Success";
    verification.status = true;
    return verification;
}

const generateToken = (id, email) => {
    //TODO: Implement JWT generation & improve security
    return Jwt.token.generate(
        {
            aud: false,
            iss: false,
            id: id,
            email: email
        },
        {
            key: process.env.JWT_SECRET_KEY,
            algorithm: 'HS512'
        },
        {
            ttlSec: 14400
        }
    );    
}

module.exports = verifyRegisterInput, createAccount, verifyLoginCredential, generateToken;