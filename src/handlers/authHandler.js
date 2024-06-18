const {verifyRegisterInput, verifyLoginCredential, generateAccessToken, generateRefreshToken} = require('../helpers/authHelper');
const {createUser, getUserById} = require('../helpers/userHelper')
const bcrypt = require('bcrypt');

const registerHandler = async (request, h) => {
    if (request.payload === undefined){
        const response = h.response({
            status: false,
            message: `No data found`,
            data: account
        });
        response.code(400);
        return response;
    }
    const {username, email, password} = request.payload;


    const verification = await verifyRegisterInput(username, email, password); 
    if (verification.status !== true){
        const response = h.response({
            status: true,
            message: verification.message,
        });
        response.code(400);
        return response;
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const account = await createUser(username, email, hashPassword);
    const response = h.response({
        status: true,
        message: `Your account is successfully registered`,
        data: account
    });
    response.code(200);
    return response;
};

const loginHandler = async (request, h) => {
    const {email, password} = request.payload;
    const verification = await verifyLoginCredential(email, password);

    if (verification.status !== true){
        const response = h.response({
            status: false,
            message: verification.message,
        });
        response.code(400);
        return response;
    }

    const account = verification.account;
    const accessToken = generateAccessToken(account.id, account.email, account.username);
    const refreshToken = generateRefreshToken(account.id)

    const response = h.response({
        status: true,
        message: `You have been logged in`,
        data: {
            access: accessToken,
            refresh: refreshToken
        }
    });
    response.code(200);
    return response;
};

const logoutHandler = async (request, h) => {
    //TODO: Implement more logic, perhaps blacklist the token? 
    const response = h.response({
        status: true,
        message: `You have been logged out`,
    });
    response.code(200);
    return response;
};

const refreshHandler = async (request, h) => {
    if (request.auth.credentials.user.type !== 'refresh'){
        const response = h.response({
            status: false,
            message: `Wrong token type`,
        });
        response.code(403);
        return response;
    }
    const userId = request.auth.credentials.user.id;
    const user = await getUserById(userId);
    const accessToken = generateAccessToken(user.id, user.email, user.username);
    const response = h.response({
        status: true,
        message: `New access token successfully generated`,
        data: accessToken
    });
    response.code(200);
    return response;
}

module.exports = {registerHandler, loginHandler, logoutHandler, refreshHandler};