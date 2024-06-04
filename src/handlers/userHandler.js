const {createUser, getUserById, getAllUsers, editUser, deleteUser} = require('../helpers/userHelper');

// TODO: Increase security, e.g. prevent sql injection
const getUserHandler = async (request, h) => {
    const id = request.params.id;
    const account = getUserById(id);

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

const editUserHandler = async (request, h) => {
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

    const account = editUser(username, email, password);
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
    deleteUser(id);
    const response = h.response({
        status: 'Success',
        message: `Account successfuly deleted`,
    });
    response.code(200);
    return response;
};

module.exports = createUserHandler, getUserHandler, editUserHandler, deleteUserHandler;