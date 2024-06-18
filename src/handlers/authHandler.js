const {verifyRegisterInput, verifyLoginCredential, generateAccessToken, generateRefreshToken} = require('../helpers/authHelper');
const {createUser, getUserById} = require('../helpers/userHelper')
const bcrypt = require('bcrypt');

const registerHandler = async (request, h) => {
    try {
        if (!request.payload) {
            const response = h.response({
                status: false,
                message: 'Payload is missing',
            });
            response.code(400);
            return response;
        }

        const { username, email, password } = request.payload;

        // Cek apakah ada field yang undefined atau kosong
        if (!username || !email || !password) {
            const response = h.response({
                status: false,
                message: 'Username, email, and password fields must not be empty',
            });
            response.code(400);
            return response;
        }

        const verification = await verifyRegisterInput(username, email, password);
        if (verification.status !== true) {
            const response = h.response({
                status: true,
                message: verification.message,
            });
            response.code(400);
            return response;
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const account = await createUser(username, email, hashPassword);
        delete account.password;

        const response = h.response({
            status: true,
            message: `Your account is successfully registered`,
            data: account
        });
        response.code(200);
        return response;
    } catch (error) {
        // Jika terjadi kesalahan yang tidak terduga
        const response = h.response({
            status: false,
            message: `Internal Server Error: ${error.message}`,
        });
        response.code(500);
        return response;
    }
};

const loginHandler = async (request, h) => {
    try {
        if (!request.payload) {
            const response = h.response({
                status: false,
                message: 'Payload is missing',
            });
            response.code(400);
            return response;
        }

        const { email, password } = request.payload;

        // Cek apakah ada field yang undefined atau kosong
        if (!email || !password) {
            const response = h.response({
                status: false,
                message: 'Email and password fields must not be empty',
            });
            response.code(400);
            return response;
        }

        const verification = await verifyLoginCredential(email, password);
        if (verification.status !== true) {
            const response = h.response({
                status: false,
                message: verification.message,
            });
            response.code(400);
            return response;
        }

        const account = verification.account;
        const accessToken = generateAccessToken(account.id, account.email, account.username);
        const refreshToken = generateRefreshToken(account.id);

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
    } catch (error) {
        // Jika terjadi kesalahan yang tidak terduga
        const response = h.response({
            status: false,
            message: `Internal Server Error: ${error.message}`,
        });
        response.code(500);
        return response;
    }
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
    try{
    if (!request.auth.credentials){
        return h.response({
            status: false,
            message: `Wrong credentials`,
        }).code(401);
    }

    if (!request.auth.user){
        return h.response({
            status: false,
            message: `Wrong credentials`,
        }).code(401);
    }

    if (!request.auth.user.access){
        return h.response({
            status: false,
            message: `Wrong credentials`,
        }).code(401);
    }

    if (request.auth.credentials.user.type !== 'refresh'){
        const response = h.response({
            status: false,
            message: `Wrong token type`,
        });
        response.code(401);
        return response;
    }
    const userId = request.auth.credentials.user.id;
    const user = await getUserById(userId);
    
    if (user === undefined){
        return h.response({
            status: false,
            message: `User not found`,
        }).code(400);
    }
    
    const accessToken = generateAccessToken(user.id, user.email, user.username);
    const response = h.response({
        status: true,
        message: `New access token successfully generated`,
        data: accessToken
    });
    response.code(200);
    return response;
    } catch (error) {
        const response = h.response({
            status: false,
            message: `Internal Server Error: ${error.message}`,
        });
        response.code(500);
        return response;
    }
}

module.exports = {registerHandler, loginHandler, logoutHandler, refreshHandler};