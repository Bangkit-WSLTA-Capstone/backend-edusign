const {verifyRegisterInput, verifyLoginCredential, generateToken} = require('../helpers/authHelper');
const {createUser} = require('../helpers/userHelper')

const registerHandler = async (request, h) => {
    const {username, email, password, repeatPassword} = request.payload;
    const verification = verifyRegisterInput(username, email, password, repeatPassword); 
    if (verification.status !== true){
        const response = h.response({
            status: 'Fail',
            message: verification.message,
        });
        response.code(400);
        return response;
    }

    // TODO: probably cut the helper middleman and just call the profile API?
    const account = createUser(username, email, password);
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
    // TODO: perhaps implement login system with username too?
    const {email, password} = request.payload;
    
    const verification = verifyLoginCredential(email, password);
    if (verification.status !== true){
        const response = h.response({
            status: 'Fail',
            message: verification.message,
        });
        response.code(400);
        return response;
    }
    
    const jwtToken = generateToken(verification.id, verification.email);
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