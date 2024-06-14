const {verifyRegisterInput, verifyLoginCredential, generateToken} = require('../helpers/authHelper');
const {createUser} = require('../helpers/userHelper')
const bcrypt = require('bcrypt');

const registerHandler = async (request, h) => {
    let hashPassword;
    const {username, email, password, repeatPassword} = request.payload;
    const verification = await verifyRegisterInput(username, email, password, repeatPassword); 
    if (verification.status !== true){
        const response = h.response({
            status: 'Fail',
            message: verification.message,
        });
        response.code(400);
        return response;
    }

    hashPassword = await bcrypt.hash(password, 12);

    const account = await createUser(username, email, hashPassword);
    console.log(account);
    const response = h.response({
        status: 'Success',
        message: `Your account is successfully registered`,
        data: {
            account: account
        }
    });
    response.code(200);
    return response;
};

const loginHandler = async (request, h) => {
    const {email, password} = request.payload;
    const verification = await verifyLoginCredential(email, password);

    if (verification.status !== true){
        const response = h.response({
            status: 'Fail',
            message: verification.message,
        });
        response.code(400);
        return response;
    }

    const account = verification.account;
    const jwtToken = generateToken(account.Id, account.Email, account.Username);

    const response = h.response({
        status: 'Success',
        message: `You have been logged in`,
        data: {
            token: jwtToken
        }
    });
    response.code(200);
    return response;
};

const logoutHandler = async (request, h) => {
    //TODO: Implement more logic, perhaps blacklist the token? 
    const response = h.response({
        status: 'Success',
        message: `You have been logged out`,
    });
    response.code(200);
    return response;
};

module.exports = {registerHandler, loginHandler, logoutHandler};