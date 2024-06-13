const {createUser, getUserById, editUser, deleteUser} = require('../helpers/userHelper');
const {verifyRegisterInput} = require('../helpers/authHelper');
const bcrypt = require('bcrypt');

const getUserHandler = async (request, h) => {
    const id = request.params.id;
    const account = await getUserById(id);

    const response = h.response({
        status: 'Success',
        message: `Account successfuly retrieved`,
        data: {
            account: account
        }
    });
    response.code(200);
    return response;
};

const createUserHandler = async (request, h) => {
    let hashPassword;
    const {username, email, password} = request.payload;

    const verification = await verifyRegisterInput(username, email);
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

const editUserHandler = async (request, h) => {
    let hashPassword;
    const {username, email, password} = request.payload;

    //TODO: Encrypt password & Handle input validation
    const verification = "";
    if (verification.status !== true){
        const response = h.response({
            status: 'Fail',
            message: verification.message,
        });
        response.code(400);
        return response;
    }

    hashPassword = await bcrypt.hash(password, 12);

    const account = await editUser(username, email, hashPassword);
    const response = h.response({
        status: 'Success',
        message: `Your account is successfully edited`,
        data: {
            account: account
        }
    });
    response.code(200);
    return response;
};

const deleteUserHandler = async (request, h) => {
    const id = request.params.id;
    //TODO: logout user and blacklist jwt token
    await deleteUser(id);
    const response = h.response({
        status: 'Success',
        message: `Account successfuly deleted`,
    });
    response.code(200);
    return response;
};

module.exports = {createUserHandler, getUserHandler, editUserHandler, deleteUserHandler};